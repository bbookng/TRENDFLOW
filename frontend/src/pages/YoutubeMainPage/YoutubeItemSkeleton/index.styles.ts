import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';
import { YoutubeItemSkeletonProps } from '@/pages/YoutubeMainPage/YoutubeItemSkeleton';
import { BORDER_RADIUS } from '@/constants/styles';

export const YoutubeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const Thumbnail = styled(Skeleton)<YoutubeItemSkeletonProps>`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 60px;
    height: 60px;
  }
`;
export const Title = styled(Skeleton)`
  flex: 1;
  border-radius: 4px;
  height: 100%;
`;
