import styled from '@emotion/styled';
import { TypographyPropsInterface } from '@/components/atoms/Typography';
import { FONT_SIZE } from '@/constants/styles';

export const Typography = styled.div<Partial<TypographyPropsInterface>>`
  font-size: ${({ variant }) => FONT_SIZE[variant!] || ''};
  color: ${({ theme, color }) => color || theme.text};
  font-weight: ${({ weight }) => weight || '400'};
`;
