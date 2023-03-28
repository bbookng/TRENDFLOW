import WordCloud from 'react-d3-cloud';
import { Typography } from '@/components/atoms';
import * as S from './index.styles';
import { useGetRelatedKeywordQuery } from '@/apis/keyword';
import { RankingItem } from '@/components/molecules';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
  { text: 'dock', value: 20 },
  { text: '김진호', value: 30 },
  { text: '문석칸', value: 40 },
  { text: '김민수', value: 509 },
  { text: '김수민', value: 123 },
  { text: '김보경', value: 2553 },
  { text: '박상민', value: 123 },
  { text: '권혁근', value: 112 },
  { text: '권햑근', value: 890 },
  { text: '방봉빔', value: 67 },
  { text: '삼성', value: 65 },
  { text: '싸피', value: 457 },
  { text: '엘지', value: 345 },
  { text: '현대', value: 678 },
  { text: '승섭', value: 124 },
  { text: '김승섭', value: 456 },
  { text: '안명수', value: 46 },
];
const RelatedKeyword = () => {
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
          <WordCloud data={data} font="PRETENDARD" />
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
