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

const YoutubeResultPage = () => {
  const {
    state: { link },
  } = useLocation();

  const { data: youtubeData } = useGetYoutubeAnalysisQuery(link);

  return (
    <S.Wrapper>
      <TitleWrapper>
        <S.TitleWrapper>
          <Typography variant="H3">유튜브 분석 레포트</Typography>
        </S.TitleWrapper>
        <SearchBar placeholder="키워드를 입력하세요" searched={link} />
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
