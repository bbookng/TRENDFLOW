import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DividerPropsInterface } from '@/components/atoms/Divider';
import { PALETTE } from '@/constants/palette';

const DividerStyle = (props: DividerPropsInterface) => css`
  overflow: hidden;
  ${props.direction === 'horizontal'
    ? `border-top:${props.width}px ${props.type} ${PALETTE.BLACK100};`
    : `border-left:${props.width}px ${props.type} ${PALETTE.BLACK100};`}
  width:${props.direction === 'horizontal' ? '100%' : '0'};
  height: ${props.direction === 'vertical' ? '100vh' : '0'};
`;
export const Divider = styled.hr`
  ${DividerStyle}
`;
