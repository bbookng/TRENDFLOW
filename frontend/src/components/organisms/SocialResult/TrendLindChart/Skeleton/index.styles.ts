import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';

export const Container = styled.div`
  width: 100%;
  height: 448px;
`;
export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const LineChartSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
