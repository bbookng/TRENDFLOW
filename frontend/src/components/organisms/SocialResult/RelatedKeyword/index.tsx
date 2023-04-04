import WordCloud from 'react-d3-cloud';
import { useMemo, useState } from 'react';
import _ from 'lodash';
import * as S from './index.styles';
import { RankingItem } from '@/components/molecules';
import { WordCloudInterface } from '@/types/keyword';
import { RankingListItemInterface } from '@/types/ranking';

interface Props {
  wordCloudKeywords: WordCloudInterface[];
  relatedKeywords: RankingListItemInterface[];
}
const RelatedKeyword = ({ wordCloudKeywords, relatedKeywords }: Props) => {
  // 워드클라우드 deppCopy

  const wordCloudData = useMemo(() => {
    return _.cloneDeep(wordCloudKeywords);
  }, [wordCloudKeywords]);

  return (
    <S.Wrapper>
      <S.SpaceTypography variant="H4">연관 키워드</S.SpaceTypography>
      <S.WordCloudPaper>
        <S.WordCloudContentsWrapper>
          <WordCloud data={wordCloudData} fontSize={60} fontWeight={600} font="PRETENDARD" />
        </S.WordCloudContentsWrapper>
      </S.WordCloudPaper>
    </S.Wrapper>
  );
};

export default RelatedKeyword;
