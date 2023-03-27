import { Divider } from '@/components/atoms';
import LabelSkeleton from '@/components/atoms/Label/Skeleton';
import CircleChartSkeleton from '@/components/molecules/CircleChart/Skeleton';
import {
  ChartWrapper,
  ContentPaper,
  RankingItemWrapper,
  RankingWrapper,
  Wrapper,
} from '@/components/organisms/MainPage/HotKeywords/index.styles';
import RankingItemSkeleton from '@/components/molecules/RankingItem/Skeleton';

const HotKeywordsSkeleton = () => {
  return (
    <Wrapper>
      <LabelSkeleton />

      <ContentPaper>
        <ChartWrapper>
          <CircleChartSkeleton />
          <Divider type="solid" direction="vertical" width={0.1} length="100%" />
        </ChartWrapper>

        <RankingWrapper>
          <RankingItemWrapper>
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
          </RankingItemWrapper>
          <RankingItemWrapper>
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
            <RankingItemSkeleton width="8rem" />
          </RankingItemWrapper>
        </RankingWrapper>
      </ContentPaper>
    </Wrapper>
  );
};

export default HotKeywordsSkeleton;
