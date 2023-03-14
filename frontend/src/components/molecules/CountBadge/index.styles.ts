import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PALETTE } from '@/constants/palette';

import { BadgePropsInterface } from '../../atoms/Badge/index';

const colorList = {
  red: css`
    color: ${PALETTE.RED400};
  `,
  blue: css`
    color: ${PALETTE.BLUE400};
  `,
  purple: css`
    color: ${PALETTE.BRAND400};
  `,
};

// TODO🍇 Typography 개발되면 H2로 수정
export const CountText = styled.h2<Partial<BadgePropsInterface>>`
  ${({ color }) => color && colorList[color]}
`;
