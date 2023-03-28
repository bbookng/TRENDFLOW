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
  padding: 0.5rem 1rem;
`;
const background = (props: ButtonPropsInterface) =>
  css`
    background-color: ${props.variant === 'contained' ? PALETTE.BRAND400 : 'transparent'};
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
  border: ${props.variant === 'outlined'
    ? `${props.borderSize ? props.borderSize : 1}px solid ${PALETTE.BRAND400}`
    : 'none'};
`;

// eslint-disable-next-line consistent-return
const buttonSize = (props: ButtonPropsInterface) => {
  if (props.size === 'SMALL') {
    return css`
      min-width: 71px;
      min-height: 44px;
      width: auto;
      height: auto;
    `;
  }
  if (props.size === 'LARGE') {
    return css`
      min-width: 360px;
      min-height: 44px;
      width: auto;
      height: auto;
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
