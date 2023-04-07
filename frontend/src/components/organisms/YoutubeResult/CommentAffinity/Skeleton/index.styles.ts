import styled from '@emotion/styled';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  @media ${MEDIA_QUERY.DESKTOP} {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`;

export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const AffinityPaper = styled(Paper)`
  width: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const BarChart = styled(Skeleton)`
  width: 100%;
  height: 28px;
  margin-bottom: 1.4rem;
  display: flex;
`;

export const ChartLabels = styled(Skeleton)`
  width: 100%;
  height: 15.2px;
`;
