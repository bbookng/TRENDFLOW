import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { PALETTE } from '@/constants/palette';

interface ChartLabelProps {
  kind: string;
}

interface BarItemProps {
  kind: string;
  value: number | undefined;
}
export const Wrapper = styled.div`
  width: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 500px;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
`;

export const AffinityPaper = styled(Paper)`
  width: 100%;
`;

export const BarChart = styled.div`
  width: 100%;
  height: 28px;
  margin-bottom: 1.4rem;
  display: flex;
`;

export const BarItem = styled.div<BarItemProps>`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: ${({ kind }) =>
    // eslint-disable-next-line no-nested-ternary
    kind === 'positive'
      ? PALETTE.BLUE400
      : kind === 'negative'
      ? PALETTE.RED400
      : PALETTE.BRAND400};
`;

export const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChartLabel = styled.div<ChartLabelProps>`
  color: ${({ kind }) =>
    // eslint-disable-next-line no-nested-ternary
    kind === 'positive'
      ? PALETTE.BLUE400
      : kind === 'negative'
      ? PALETTE.RED400
      : PALETTE.BRAND400};
  display: flex;
  gap: 0.6rem;
`;

export const Circle = styled.div<ChartLabelProps>`
  width: 12px;
  height: 12px;
  background-color: ${({ kind }) =>
    // eslint-disable-next-line no-nested-ternary
    kind === 'positive'
      ? PALETTE.BLUE400
      : kind === 'negative'
      ? PALETTE.RED400
      : PALETTE.BRAND400};
  border-radius: ${BORDER_RADIUS.ROUND};
`;

export const Span = styled.span`
  font-size: 0.95rem;
`;
