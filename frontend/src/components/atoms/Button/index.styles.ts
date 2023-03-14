import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BORDER_RADIUS, FONT_SIZE } from '@/constants/styles';
import { ButtonPropsInterface } from '@/components/atoms/Button';
import { PALETTE } from '@/constants/palette';

const defaultStyle = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  border-radius: ${BORDER_RADIUS.XS};
  font-weight: 900;
  color: #000;
  font-size: 1rem;
  transition: background 0.3s;
  padding: 2px 4px;
`;
const background = (props: ButtonPropsInterface) =>
  css`
    background-color: ${props.variant === 'contained' ? PALETTE.BRAND400 : PALETTE.WHITE100};
  `;

const event = (props: ButtonPropsInterface) => css`
  &:hover {
    background-color: ${props.variant === 'contained' ? PALETTE.BRAND500 : PALETTE.WHITE200};
  }
`;

const fontColor = (props: ButtonPropsInterface) => css`
  color: ${props.variant === 'contained' ? PALETTE.WHITE100 : PALETTE.BRAND400};
`;

const fontSize = (props: ButtonPropsInterface) => css`
  font-size: ${props.fontSize ? FONT_SIZE[props.fontSize] : '1rem'};
`;

const border = (props: ButtonPropsInterface) => css`
  border: ${props.variant === 'outlined' ? `1px solid ${PALETTE.BLACK400}` : 'none'};
`;

// eslint-disable-next-line consistent-return
const buttonSize = (props: ButtonPropsInterface) => {
  if (props.size === 'SMALL') {
    return css`
      width: 71px;
      height: 44px;
    `;
  }
  if (props.size === 'LARGE') {
    return css`
      width: 360px;
      height: 44px;
    `;
  }
};

export const Button = styled.button`
  ${defaultStyle}
  ${fontColor}
  ${fontSize}
  ${border}
  ${background}
  ${buttonSize}
  ${event}
`;
