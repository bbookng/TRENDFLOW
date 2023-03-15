import styled from '@emotion/styled';

import { FONT_SIZE } from '@/constants/styles';

import { TypographyPropsInterface } from '@/components/atoms/Typography';

export const Typography = styled.div<Partial<TypographyPropsInterface>>`
  font-size: ${({ variant }) => FONT_SIZE[variant!]};
  color: ${({ theme, color }) => color || theme.text};
  font-weight: ${({ weight }) => weight};
`;
