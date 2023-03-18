import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { PALETTE } from '@/constants/palette';

import Typography from '@/components/atoms/Typography';
import { RankChangeType } from '@/components/molecules/RankingItem';

const colorList = {
  up: css`
    color: ${PALETTE.RED400};
  `,
  down: css`
    color: ${PALETTE.BLUE400};
  `,
  new: css`
    color: ${PALETTE.BRAND400};
  `,
  same: css`
    color: '';
  `,
};

export const Wrapper = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${({ width }) => width};
  min-width: 10rem;
  cursor: pointer;
`;

export const RankKeywordWrapper = styled.div`
  display: flex;
`;

export const Rank = styled(Typography)`
  width: 0.75rem;
  margin-right: 1.75rem;
  text-align: center;
`;

export const StepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
`;

export const Triangle = styled.div<{ type: RankChangeType }>`
  width: 0;
  height: 0;
  border-bottom: calc(0.375rem * 1.732) solid
    ${({ type }) => (type === 'down' ? `${PALETTE.BLUE400}` : `${PALETTE.RED400}`)};
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
  transform: ${({ type }) => type === 'down' && 'rotateX(180deg)'};

  margin-right: 0.1rem;
`;

export const ChangedStep = styled(Typography)<{ type: RankChangeType }>`
  ${({ type }) => colorList[type]};
`;
