package com.trendflow.analyze.analyze.controller;

import com.trendflow.analyze.analyze.dto.request.*;
import com.trendflow.analyze.analyze.dto.response.*;
import com.trendflow.analyze.analyze.service.AnalyzeService;
import com.trendflow.analyze.global.code.AnalyzeCode;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analyze")
public class AnalyzeController {
    private final AnalyzeService analyzeService;

    @GetMapping("/social")
    public ResponseEntity<BasicResponse> findSocial(@RequestParam String keyword,
                                                    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){

        log.info("findSocial - Call");

        try {
            List<FindSocialResponse> findSocialResponseList
                    = analyzeService.findSocial(FindSocialRequest.builder()
                                                .keyword(keyword)
                                                .startDate(startDate.atStartOfDay())
                                                .endDate(endDate.atTime(23,59, 59))
                                                .build());

            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, findSocialResponseList));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.DATA_FOUND_FAIL, null));
        } catch (RuntimeException e){
            e.printStackTrace();
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }

    @GetMapping("/related")
    public ResponseEntity<BasicResponse> findRelationContent(@RequestParam String keyword,
                                                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
        log.info("findRelationContent - Call");

        try {
            List<FindRelationContentResponse> findRelationContentResponseList
                    = analyzeService.findRelationContent(FindRelationContentRequest.builder()
                                                        .keyword(keyword)
                                                        .startDate(startDate.atStartOfDay())
                                                        .endDate(endDate.atTime(23,59, 59))
                                                        .build());

            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, findRelationContentResponseList));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.DATA_FOUND_FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }

    @GetMapping("/youtube")
    public ResponseEntity<BasicResponse> findYoutube(@RequestParam String link){
        log.info("findYoutube - Call");

        try {
            List<FindYoutubeResponse> findYoutubeResponseList
                    = analyzeService.findYoutube(FindYoutubeRequest.builder()
                                                    .link(link)
                                                    .build());

            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, findYoutubeResponseList));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.DATA_FOUND_FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }

    @GetMapping("/youtube/comment")
    public ResponseEntity<BasicResponse> findYoutubeComment(@RequestParam String link,
                                                            @RequestParam Integer code,
                                                            @RequestParam Integer page,
                                                            @RequestParam Integer perPage){
        log.info("findYoutubeComment - Call");

        try {
            List<FindYoutubeCommentResponse> findYoutubeCommentResponseList
                    = analyzeService.findYoutubeComment(FindYoutubeCommentRequest.builder()
                                                            .link(link)
                                                            .code(code)
                                                            .page(page)
                                                            .perPage(perPage)
                                                            .build());

            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, findYoutubeCommentResponseList));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.DATA_FOUND_FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }
    @GetMapping("/compare")
    public ResponseEntity<BasicResponse> findCompareKeyword(@RequestParam String keyword1,
                                                            @RequestParam String keyword2,
                                                            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
        log.info("findYoutubeComment - Call");

        try {
            FindCompareKeywordResponse findCompareKeywordResponse
                    = analyzeService.findCompareKeyword(FindCompareKeywordRequest.builder()
                                                            .keywordA(keyword1)
                                                            .keywordB(keyword2)
                                                            .startDate(startDate.atStartOfDay())
                                                            .endDate(endDate.atTime(23,59, 59))
                                                            .build());
            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, findCompareKeywordResponse));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.DATA_FOUND_FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }

    // feign
    @GetMapping("/relate/{keywordId}")
    public ResponseEntity<List<FindRelationKeywordResponse>> findRelationKeyword(@PathVariable Long keywordId){
        log.info("findRelationKeyword - Call");

        try {
            List<FindRelationKeywordResponse> findLocalCodeResponseList = analyzeService.findRelationKeyword(keywordId);
            return ResponseEntity.ok().body(findLocalCodeResponseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/relate/wordcloud/{keywordId}")
    public ResponseEntity<List<FindWordCloudKeywordResponse>> findWordCloudKeyword(@PathVariable Long keywordId){
        log.info("findWordCloudKeyword - Call");

        try {
            List<FindWordCloudKeywordResponse> findWordCloudKeywordResponseList = analyzeService.findWordCloudKeyword(keywordId);
            return ResponseEntity.ok().body(findWordCloudKeywordResponseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
