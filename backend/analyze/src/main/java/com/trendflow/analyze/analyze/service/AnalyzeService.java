package com.trendflow.analyze.analyze.service;

import com.trendflow.analyze.analyze.dto.request.*;
import com.trendflow.analyze.analyze.dto.response.*;
import com.trendflow.analyze.analyze.dto.vo.*;
import com.trendflow.analyze.analyze.entity.Relation;
import com.trendflow.analyze.analyze.entity.SentimentCount;
import com.trendflow.analyze.analyze.repository.RelationRepository;
import com.trendflow.analyze.analyze.repository.SentimentRepository;
import com.trendflow.analyze.global.code.Code;
import com.trendflow.analyze.global.code.SocialCacheCode;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.global.redis.*;
import com.trendflow.analyze.msa.dto.vo.Keyword;
import com.trendflow.analyze.msa.dto.vo.KeywordCount;
import com.trendflow.analyze.msa.dto.vo.Source;
import com.trendflow.analyze.msa.service.CommonService;
import com.trendflow.analyze.msa.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final RelationRepository relationRepository;
    private final SentimentRepository sentimentRepository;
    private final YoutubeSourceRepository youtubeSourceRepository;
    private final YoutubueAnalyzeRepository youtubueAnalyzeRepository;

    private final CommonService commonService;
    private final KeywordService keywordService;
    private final KafkaService kafkaService;
    private final YoutubeService youtubeService;

    @Transactional
    public List<FindSocialResponse> findSocial(FindSocialRequest findSocialRequest) {
        String keyword = findSocialRequest.getKeyword();
        LocalDate startDate = findSocialRequest.getStartDate();
        LocalDate endDate = findSocialRequest.getEndDate();

        SocialMap socialMap = getSocialMap(keyword, startDate, endDate);

        List<Social> socialList = new ArrayList<>();
        Map<LocalDate, MentionCountInfo> keywordCountMap = socialMap.getKeywordCountMap();
        Map<LocalDate, GrapeQuotientInfo> sentimentCountMap = socialMap.getSentimentCountMap();

        LocalDate now = startDate;
        LocalDate end = endDate;

        // 전날 데이터 확인 후 삽입
        if (!keywordCountMap.containsKey(now.minusDays(1))) {
            keywordCountMap.put(now.minusDays(1), MentionCountInfo.builder()
                    .daum(0)
                    .naver(0)
                    .twitter(0)
                    .total(0)
                    .build());
        }
        if (!sentimentCountMap.containsKey(now.minusDays(1))) {
            sentimentCountMap.put(now.minusDays(1), GrapeQuotientInfo.builder()
                    .positive(0)
                    .negative(0)
                    .neutral(0)
                    .build());
        }

        // 일자별 확인
        while (now.isBefore(end) || now.isEqual(end)) {
            MentionCountInfo mentionCountInfo;
            GrapeQuotientInfo grapeQuotientInfo;

            // 언급량 일자별 정리
            if (keywordCountMap.containsKey(now)) {
                MentionCountInfo nowMentionCount = keywordCountMap.get(now);
                Integer daum = nowMentionCount.getDaum();
                Integer naver = nowMentionCount.getNaver();
                Integer twitter = nowMentionCount.getTwitter();
                mentionCountInfo = MentionCountInfo.builder()
                        .daum(daum)
                        .naver(naver)
                        .twitter(twitter)
                        .total(daum + naver + twitter)
                        .build();
            } else {
                mentionCountInfo = MentionCountInfo.builder()
                        .daum(0)
                        .naver(0)
                        .twitter(0)
                        .total(0)
                        .build();
                keywordCountMap.put(now, mentionCountInfo);
            }

            // 긍부정 지수 일자별 정리
            if (sentimentCountMap.containsKey(now)) {
                GrapeQuotientInfo nowGrapeQuotient = sentimentCountMap.get(now);
                Double positive = nowGrapeQuotient.getPositive().doubleValue();
                Double negative = nowGrapeQuotient.getNegative().doubleValue();
                Double neutral = nowGrapeQuotient.getNeutral().doubleValue();
                Double sum = positive + negative + neutral;

                System.out.println(sum + " " + positive + " " + negative + " " + neutral);

                if (sum != 0) {
                    positive = positive / sum * 100;
                    negative = negative / sum * 100;
                    neutral = neutral / sum * 100;
                }

                System.out.println(sum + " " + positive + " " + negative + " " + neutral);

                grapeQuotientInfo = GrapeQuotientInfo.builder()
                    .positive(positive.intValue())
                    .negative(negative.intValue())
                    .neutral(neutral.intValue())
                    .build();
            } else {
                grapeQuotientInfo = GrapeQuotientInfo.builder()
                        .positive(0)
                        .negative(0)
                        .neutral(0)
                        .build();
                sentimentCountMap.put(now, grapeQuotientInfo);
            }

            // 비교 분석
            LocalDate past = now.minusDays(1);
            CompareInfoVo mention = compareKeywrodCount(keywordCountMap.get(past), keywordCountMap.get(now));
            CompareInfoVo grapeQuotient = compareSentimentCount(sentimentCountMap.get(past), sentimentCountMap.get(now));

            socialList.add(Social.builder()
                    .date(now)
                    .mentionCountInfo(mentionCountInfo)
                    .grapeQuotientInfo(grapeQuotientInfo)
                    .compareInfo(CompareInfo.builder()
                            .mention(mention)
                            .grapeQuotient(grapeQuotient)
                            .build())
                    .build());

            now = now.plusDays(1);
        }

        return FindSocialResponse.toList(socialList);
    }

    public List<FindRelationContentResponse> findRelationContent(FindRelationContentRequest findRelationContentRequest) {
        String keyword = findRelationContentRequest.getKeyword();
        String code = findRelationContentRequest.getCode();
        Integer page = findRelationContentRequest.getPage();
        Integer perPage = findRelationContentRequest.getPerPage();
        LocalDate startDate = findRelationContentRequest.getStartDate();
        LocalDate endDate = findRelationContentRequest.getEndDate();

        String YOUTUBE = commonService.getLocalCode(Code.YOUTUBE);

        List<FindRelationContentResponse> findRelationContentResponseList = null;
        // 유튜브
        if (code.equals(YOUTUBE)) {
            // 캐시서버에 유튜브 원본이 있는지 확인
            String key = String.format("%s_%s", Code.YOUTUBE.getName(), keyword);

            List<YoutubeSource> youtubeSourceList = youtubeSourceRepository.findById(key)
                    .orElseGet(() -> {
                        // 없으면 API 호출
                        List<Source> now = youtubeService.getYoutubeSource(keyword);
                        List<YoutubeSource> youtubeNow = YoutubeSource.toList(now);
                        youtubeSourceRepository.saveResult(key, youtubeNow, 6000);
                        return youtubeNow;
                    });

            if (page * perPage <= youtubeSourceList.size()) {
                // page 별로 짤라서 반환
                PageRequest pageRequest = PageRequest.of((page - 1), perPage);
                int start = (int) pageRequest.getOffset();
                int end = Math.min((start + pageRequest.getPageSize()), youtubeSourceList.size());
                Page<YoutubeSource> youtubeSourcePage = new PageImpl<>(youtubeSourceList.subList(start, end), pageRequest, youtubeSourceList.size());

                List<Source> sourceList = Source.toList(youtubeSourcePage.toList());
                findRelationContentResponseList = FindRelationContentResponse.toList(Code.YOUTUBE.getName(), code, sourceList);
            } else {
                findRelationContentResponseList = new ArrayList<>();
            }
        } else {
            // 키워드 리스트 요청
            List<Keyword> keywordList = keywordService.getKeywordPage(keyword, code, page, perPage, startDate, endDate);
            // 원본 데이터 요청
            List<Source> sourceList = commonService.getSource(keywordList.stream()
                    .map(Keyword::getSourceId)
                    .distinct()
                    .collect(Collectors.toList()));

            String DAUM_NEWS = commonService.getLocalCode(Code.DAUM_NEWS);
            String NAVER_NEWS = commonService.getLocalCode(Code.NAVER_NEWS);
            String NAVER_BLOG = commonService.getLocalCode(Code.NAVER_BLOG);

            AtomicLong id = new AtomicLong();
            findRelationContentResponseList = sourceList.stream().map(source -> {
                if (source.getPlatformCode().equals(DAUM_NEWS)) {
                    return FindRelationContentResponse.of(id.getAndIncrement() + 1, Code.DAUM.getName(), code, source);
                } else if (source.getPlatformCode().equals(NAVER_NEWS) || source.getPlatformCode().equals(NAVER_BLOG)) {
                    return FindRelationContentResponse.of(id.getAndIncrement() + 1, Code.NAVER.getName(), code, source);
                } else {
                    return FindRelationContentResponse.of(id.getAndIncrement() + 1, null, code, source);
                }
            }).collect(Collectors.toList());
        }
        return findRelationContentResponseList;
    }

    public FindYoutubeResponse findYoutube(String link) {

        String key = "YOUTUBE_ANALYZE_" + link;

        YoutubueAnalyze youtubueAnalyze = youtubueAnalyzeRepository.findById(key)
                .orElseGet(() -> {
                    YoutubueAnalyze now = youtubeService.getYoutubeVideo(link);
                    youtubueAnalyzeRepository.save(key, now, 60000);

                    ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
                    taskExecutor.initialize();
                    taskExecutor.execute(() -> {
                        try {
                            kafkaService.sendYoutubeUrl(link);
                            Payload payload = kafkaService.consumeYoutubeAnalyze();

                            YoutubueAnalyze nowThread = youtubueAnalyzeRepository.findById(key)
                                    .orElseThrow(() -> new NotFoundException());

                            nowThread.setCommentList(payload.getCommentDf());
                            nowThread.setAnalyzeResultList(payload.getCntDf());

                            youtubueAnalyzeRepository.save(key, now, 60000);

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });

                    return now;
                });

        return FindYoutubeResponse.builder()
                        .title(youtubueAnalyze.getTitle())
                        .url(youtubueAnalyze.getUrl())
                        .reaction(FindYoutubeResponse.Reaction.builder()
                                .viewCount(youtubueAnalyze.getViewCount())
                                .likeCount(youtubueAnalyze.getLikeCOunt())
                                .commentCount(youtubueAnalyze.getCommentCount())
                                .build())
                        .affinityInfo(FindYoutubeResponse.AffinityInfo.builder()
                                .positive(youtubueAnalyze.getPositive())
                                .negative(youtubueAnalyze.getNegative())
                                .neutral(youtubueAnalyze.getNeutral())
                                .build())
                        .owner(FindYoutubeResponse.Owner.builder()
                                .name(youtubueAnalyze.getName())
                                .subscribeCount(youtubueAnalyze.getSubscribeCount())
                                .build())
                        .build();
//        kafkaService.sendYoutubeUrl(findYoutubeRequest.getLink());
//        return kafkaService.consumeYoutubeAnalyze();
    }

    public List<FindYoutubeCommentResponse> findYoutubeComment(FindYoutubeCommentRequest findYoutubeCommentRequest) {
        System.out.println("findYoutubeCommentRequest = " + findYoutubeCommentRequest);
        return null;
    }

    public FindCompareKeywordResponse findCompareKeyword(FindCompareKeywordRequest findCompareKeywordRequest) {
        String keywordA = findCompareKeywordRequest.getKeywordA();
        String keywordB = findCompareKeywordRequest.getKeywordB();
        LocalDate startDate = findCompareKeywordRequest.getStartDate();
        LocalDate endDate = findCompareKeywordRequest.getEndDate();

        SocialMap socialMapA = getSocialMap(keywordA, startDate, endDate);
        SocialMap socialMapB = getSocialMap(keywordB, startDate, endDate);

        FindCompareKeywordResponse findCompareKeywordResponse = FindCompareKeywordResponse.builder()
                .grapeQuotientCompare(new ArrayList<>())
                .mentionCountCompare(new ArrayList<>())
                .build();

        Map<LocalDate, MentionCountInfo> keywordCountMapA = socialMapA.getKeywordCountMap();
        Map<LocalDate, GrapeQuotientInfo> sentimentCountMapA = socialMapA.getSentimentCountMap();
        Map<LocalDate, MentionCountInfo> keywordCountMapB = socialMapB.getKeywordCountMap();
        Map<LocalDate, GrapeQuotientInfo> sentimentCountMapB = socialMapB.getSentimentCountMap();

        LocalDate now = startDate;
        LocalDate end = endDate;
        // 일자별 확인
        while (now.isBefore(end) || now.isEqual(end)) {
            CountCompare mentionCountCompare = CountCompare.builder()
                    .date(now)
                    .build();
            CountCompare grapeQuotientCompare = CountCompare.builder()
                    .date(now)
                    .build();

            // 워드 카운트
            Integer countA = 0;
            Integer countB = 0;
            if (keywordCountMapA.containsKey(now)){
                MentionCountInfo nowMentionCount = keywordCountMapA.get(now);
                countA = nowMentionCount.getTotal();
            }
            if (keywordCountMapB.containsKey(now)){
                MentionCountInfo nowMentionCount = keywordCountMapB.get(now);
                countB = nowMentionCount.getTotal();
            }
            
            // 비교
            if (countA > countB) {
                mentionCountCompare.setType(SocialCacheCode.TYPE_UP.getCode());
                mentionCountCompare.setDifference(countA - countB);
            } else if (countA == countB) {
                mentionCountCompare.setType(SocialCacheCode.TYPE_SAME.getCode());
                mentionCountCompare.setDifference(0);
            } else {
                mentionCountCompare.setType(SocialCacheCode.TYPE_DOWN.getCode());
                mentionCountCompare.setDifference(countB - countA);
            }
            mentionCountCompare.setKeyword1(countA);
            mentionCountCompare.setKeyword2(countB);

            // 긍 부정
            Double senA = 0D;
            Double senB = 0D;
            if (sentimentCountMapA.containsKey(now)){
                GrapeQuotientInfo nowGrapeQuotient = sentimentCountMapA.get(now);
                Double sum = nowGrapeQuotient.getPositive().doubleValue() +
                                nowGrapeQuotient.getNegative().doubleValue() +
                                    nowGrapeQuotient.getNeutral().doubleValue();
                senA = nowGrapeQuotient.getPositive().doubleValue();
                if (sum != 0) senA = senA / sum * 100;
            }
            if (sentimentCountMapB.containsKey(now)){
                GrapeQuotientInfo nowGrapeQuotient = sentimentCountMapB.get(now);
                Double sum = nowGrapeQuotient.getPositive().doubleValue() +
                                nowGrapeQuotient.getNegative().doubleValue() +
                                    nowGrapeQuotient.getNeutral().doubleValue();
                senB = nowGrapeQuotient.getPositive().doubleValue();;
                if (sum != 0) senB = senB / sum * 100;
            }

            // 비교
            if (senA > senB) {
                grapeQuotientCompare.setType(SocialCacheCode.TYPE_UP.getCode());
                grapeQuotientCompare.setDifference(new Double(senA - senB).intValue());
            } else if (senA == senB) {
                grapeQuotientCompare.setType(SocialCacheCode.TYPE_SAME.getCode());
                grapeQuotientCompare.setDifference(0);
            } else {
                grapeQuotientCompare.setType(SocialCacheCode.TYPE_DOWN.getCode());
                grapeQuotientCompare.setDifference(new Double(senB - senA).intValue());
            }
            grapeQuotientCompare.setKeyword1(senA.intValue());
            grapeQuotientCompare.setKeyword2(senB.intValue());

            findCompareKeywordResponse.getMentionCountCompare().add(mentionCountCompare);
            findCompareKeywordResponse.getGrapeQuotientCompare().add(grapeQuotientCompare);

            now = now.plusDays(1);
        }

        return findCompareKeywordResponse;
    }

    @Transactional
    public List<FindRelationKeywordResponse> findRelationKeyword(List<Long> keywordIdList) {
        List<Relation> relationList = relationRepository.findByKeywordIdList(keywordIdList, 8);
        return relationList.stream()
                .map(FindRelationKeywordResponse::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<FindWordCloudKeywordResponse> findWordCloudKeyword(List<Long> keywordIdList) {
        List<Relation> relationList = relationRepository.findByKeywordIdList(keywordIdList, 100);
        return relationList.stream()
                .map(FindWordCloudKeywordResponse::of)
                .collect(Collectors.toList());
    }

    private SocialMap getSocialMap(String keyword, LocalDate startDate, LocalDate endDate) {
        // 플랫폼 별 언급량
        List<KeywordCount> keywordCountList = keywordService.getKeywordCount(keyword, startDate.minusDays(1), endDate);

        Integer start = Integer.parseInt(startDate.toString().replace("-", ""));
        Integer end = Integer.parseInt(endDate.toString().replace("-", ""));

        // 키워드와 일치하는 키워드 객체 응답
        List<Keyword> keywordList = keywordService.getKeyword(keyword, startDate.minusDays(1), endDate);
        // 키워드의 일자별, 소스별 긍정, 중립, 부정 지수
        List<SentimentCount> sentimentList = sentimentRepository.findBySourceIdIn(
                keywordList.stream()
                    .map(Keyword::getSourceId)
                    .collect(Collectors.toList()), start, end);

        // 맵 생성
        Map<LocalDate, MentionCountInfo> keywordCountMap = new HashMap<>();
        for (KeywordCount keywordCount : keywordCountList) {
            LocalDate now = keywordCount.getRegDt();
            String platformCode = keywordCount.getPlatformCode();
            Long count = keywordCount.getCount();

            if (!keywordCountMap.containsKey(now))
                keywordCountMap.put(now, setMentionCountInfo(MentionCountInfo.builder()
                        .daum(0)
                        .naver(0)
                        .twitter(0)
                        .total(0)
                        .build(), platformCode, count));
            else keywordCountMap.put(now, setMentionCountInfo(keywordCountMap.get(now), platformCode, count));
        }

        Map<LocalDate, GrapeQuotientInfo> sentimentCountMap = new HashMap<>();
        for (SentimentCount sentimentCount : sentimentList) {
            LocalDate now = sentimentCount.getRegDt();
            Long score = sentimentCount.getScore();
            Long count = sentimentCount.getCount();

            if (!sentimentCountMap.containsKey(now))
                sentimentCountMap.put(now, setGrapeQuotientInfo(GrapeQuotientInfo.builder()
                        .positive(0)
                        .negative(0)
                        .neutral(0)
                        .build(), score, count));
            else sentimentCountMap.put(now, setGrapeQuotientInfo(sentimentCountMap.get(now), score, count));
        }

        return SocialMap.builder()
                .keywordCountMap(keywordCountMap)
                .sentimentCountMap(sentimentCountMap)
                .build();
    }

    private CompareInfoVo compareKeywrodCount(MentionCountInfo past, MentionCountInfo now) {
        String type;
        Integer changed;

        Integer pastTotal = past.getTotal();
        Integer nowTotal = now.getTotal();

        if (nowTotal > pastTotal) {
            type = SocialCacheCode.TYPE_UP.getCode();
            changed = nowTotal - pastTotal;
        } else if (nowTotal == pastTotal) {
            type = SocialCacheCode.TYPE_SAME.getCode();
            changed = 0;
        } else {
            type = SocialCacheCode.TYPE_DOWN.getCode();
            changed = pastTotal - nowTotal;
        }

        return CompareInfoVo.builder()
                .type(type)
                .changed(changed)
                .build();
    }

    private CompareInfoVo compareSentimentCount(GrapeQuotientInfo past, GrapeQuotientInfo now) {
        String type;
        Integer changed;

        Integer pastSum = past.getPositive() + past.getNegative() + past.getNeutral();
        Integer pastGrape = past.getPositive();
        if (pastSum != 0) pastGrape /= pastSum * 100;

        Integer nowSum = now.getPositive() + now.getNegative() + now.getNeutral();
        Integer nowGrape = now.getPositive();
        if (nowSum != 0) nowGrape /= nowSum * 100;

        if (nowGrape > pastGrape) {
            type = SocialCacheCode.TYPE_UP.getCode();
            changed = nowGrape - pastGrape;
        } else if (nowGrape == pastGrape) {
            type = SocialCacheCode.TYPE_SAME.getCode();
            changed = 0;
        } else {
            type = SocialCacheCode.TYPE_DOWN.getCode();
            changed = pastGrape - nowGrape;
        }

        return CompareInfoVo.builder()
                .type(type)
                .changed(changed)
                .build();
    }

    private MentionCountInfo setMentionCountInfo(MentionCountInfo mentionCountInfo, String platformCode, Long count) {
        String DAUM_NEWS = commonService.getLocalCode(Code.DAUM_NEWS);
        String NAVER_NEWS = commonService.getLocalCode(Code.NAVER_NEWS);
        String NAVER_BLOG = commonService.getLocalCode(Code.NAVER_BLOG);
        String TWITTER = commonService.getLocalCode(Code.TWITTER);

        Integer daumNews = 0;
        Integer naverNews = 0;
        Integer naverBlog = 0;
        Integer twitter = 0;

        if (platformCode.equals(DAUM_NEWS)) daumNews = count.intValue();
        else if (platformCode.equals(NAVER_NEWS)) naverNews = count.intValue();
        else if (platformCode.equals(NAVER_BLOG)) naverBlog = count.intValue();
        else if (platformCode.equals(TWITTER)) twitter = count.intValue();

        mentionCountInfo.setDaum(mentionCountInfo.getDaum() + daumNews);
        mentionCountInfo.setNaver(mentionCountInfo.getNaver() + naverNews + naverBlog);
        mentionCountInfo.setTwitter(mentionCountInfo.getTwitter() + twitter);
        mentionCountInfo.setTotal(mentionCountInfo.getTotal() + daumNews + naverNews + naverBlog + twitter);

        return mentionCountInfo;
    }

    private GrapeQuotientInfo setGrapeQuotientInfo(GrapeQuotientInfo grapeQuotientInfo, Long score, Long count) {
        if (score == 1L) grapeQuotientInfo.setPositive(count.intValue());
        else if (score == 0L) grapeQuotientInfo.setNegative(count.intValue());
        else grapeQuotientInfo.setNeutral(count.intValue());

        return grapeQuotientInfo;
    }
}
