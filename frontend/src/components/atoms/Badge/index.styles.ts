import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS, BOX_SHADOW } from '@/constants/styles';

import { BadgePropsInterface } from '@/components/atoms/Badge';

const backGroundColorList = {
  red: css`
    background-color: ${PALETTE.RED100};
  `,
  blue: css`
    background-color: ${PALETTE.BLUE100};
  `,
  purple: css`
    background-color: ${PALETTE.BRAND100};
  `,
};

export const Badge = styled.div<Partial<BadgePropsInterface>>`
  ${({ color }) => color && backGroundColorList[color]}
  width: ${({ width }) => width};
  height: ${({ width }) => width};

  /* 공통 css */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  line-height: 1rem;

  border-radius: ${BORDER_RADIUS.ROUND};
  box-shadow: ${BOX_SHADOW.BLACK_SM};

  cursor: pointer;
  p {
    margin: 0;
  }
`;
