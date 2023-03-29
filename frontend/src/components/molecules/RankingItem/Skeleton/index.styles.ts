import styled from '@emotion/styled';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';
import { MEDIA_QUERY } from '@/constants/media';

export const RankingItemSkeleton = styled(Skeleton)<{ width: string }>`
  min-width: 8rem;
  height: 1rem;
  margin: 0.4rem 0;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: ${({ width }) => width};
    min-width: 11rem;
    margin: 0.5rem 0;
  }
`;
