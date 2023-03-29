import WordCloud from 'react-d3-cloud';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@/components/atoms';
import * as S from './index.styles';
import { useGetRelatedKeywordQuery, useGetWordCloudKeywordQuery } from '@/apis/keyword';
import { RankingItem } from '@/components/molecules';
import { WordCloudInterface } from '@/types/keyword';

interface Props {
  wordCloudKeywords: WordCloudInterface[];
}
const RelatedKeyword = ({ wordCloudKeywords }: Props) => {
  const {
    data: relatedKeywords,
    error: relatedKeywordsError,
    isLoading: relatedKeywordsLoading,
  } = useGetRelatedKeywordQuery();

  return (
    <>
      <S.SpaceTypography variant="H4">연관 키워드</S.SpaceTypography>
      <S.WordCloudPaper>
        <S.WordCloudContentsWrapper>
          {/* <WordCloud data={test} font="PRETENDARD" /> */}
        </S.WordCloudContentsWrapper>
        <S.RankingListWrapper>
          <S.RelatedItemWrapper>
            {relatedKeywords &&
              relatedKeywords
                .slice(0, 4)
                .map((item) => <RankingItem key={item.rank} {...item} width="8rem" />)}
          </S.RelatedItemWrapper>

          <S.RelatedItemWrapper>
            {relatedKeywords &&
              relatedKeywords
                .slice(-4)
                .map((item) => <RankingItem key={item.rank} {...item} width="8rem" />)}
          </S.RelatedItemWrapper>
        </S.RankingListWrapper>
      </S.WordCloudPaper>
    </>
  );
};

export default RelatedKeyword;
