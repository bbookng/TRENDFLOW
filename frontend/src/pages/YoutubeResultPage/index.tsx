import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as S from './index.styles';
import { useGetYoutubeAnalysisQuery } from '@/apis/analyze';
import IFrame from '@/components/atoms/Iframe';
import YoutubeReaction from '@/components/organisms/YoutubeResult/YoutubeReaction';
import { SearchBar } from '@/components/molecules';
import { convertCount } from '@/utils/convert';
import { Paper, Typography } from '@/components/atoms';
import { TitleWrapper } from '@/pages/SocialResultPage/index.styles';
import CommentAffinity from '@/components/organisms/YoutubeResult/CommentAffinity';
import CommentAnalysis from '@/components/organisms/YoutubeResult/CommentAnalysis';
import { ROUTER_PATH } from '@/constants/path';

const YoutubeResultPage = () => {
  const navi = useNavigate();
  const {
    state: { link },
  } = useLocation();
  const [value, setValue] = useState(link);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 페이지 이동 필요 X 새로운 키워드를 가지고 api 다시 쏴서 데이터만 받으면 될듯
    console.log('??');
    navi(`/${ROUTER_PATH.YOUTUBE_RESULT_PAGE}`, { state: { link: value } });
  };
  const { data: youtubeData } = useGetYoutubeAnalysisQuery(link);

  return (
    <S.Wrapper>
      <TitleWrapper>
        <S.TitleWrapper>
          <Typography variant="H3">유튜브 분석 레포트</Typography>
        </S.TitleWrapper>
        <SearchBar
          placeholder="키워드를 입력하세요"
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </TitleWrapper>
      <S.YoutubeInfo>
        <S.VideoInfo>
          <IFrame videoLink={youtubeData?.video.url} />
          <Paper>
            <S.Title>{youtubeData?.video.title}</S.Title>
            <S.OwnerInfo>
              <S.OwnerName>{youtubeData?.video.owner.name}</S.OwnerName>
              <S.OwnerSubscribe>
                {convertCount(youtubeData?.video.owner.subscribeCount)}
              </S.OwnerSubscribe>
            </S.OwnerInfo>
          </Paper>
        </S.VideoInfo>
        <S.FlexBox>
          <YoutubeReaction
            viewCount={youtubeData?.video.reaction.viewCount}
            likeCount={youtubeData?.video.reaction.likeCount}
            commentCount={youtubeData?.video.reaction.commentCount}
          />

          <CommentAffinity
            positive={youtubeData?.video.affinityInfo.positive}
            negative={youtubeData?.video.affinityInfo.negative}
            neutral={youtubeData?.video.affinityInfo.neutral}
          />
        </S.FlexBox>
      </S.YoutubeInfo>
      <CommentAnalysis link={link} />
    </S.Wrapper>
  );
};

export default YoutubeResultPage;
