import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PALETTE } from '@/constants/palette';

import Typography from '@/components/atoms/Typography';
import { BadgePropsInterface } from '@/components/atoms/Badge';

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

export const CountText = styled(Typography)<Partial<BadgePropsInterface>>`
  ${({ color }) => color && colorList[color]}
`;
