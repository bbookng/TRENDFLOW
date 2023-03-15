/* eslint-disable consistent-return */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TypographyPropsInterface } from '@/components/atoms/Typography';
import { FONT_SIZE } from '@/constants/styles';

const typographyStyle = (props: TypographyPropsInterface) => css`
  font-size: ${props.variant ? FONT_SIZE[props.variant] : ''};
  color: ${props.color};
  font-weight: ${props.weight};
`;

export const Typography = styled.div`
  ${typographyStyle}
`;
