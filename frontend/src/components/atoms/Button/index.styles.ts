import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BORDER_RADIUS } from '@/constants/styles';
import { ButtonPropsInterface } from '@/components/atoms/Button';
import { PALETTE } from '@/constants/palette';

// // Button 기본 스타일 지정
// const defaultStyle = css`
//   outline: none;
//   border: none;
//   box-sizing: border-box;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   line-height: 1;
//   border-radius: ${BORDER_RADIUS.XS};
//   font-weight: bold;
//   color: ${fontColor};
//   font-size: 1rem;
//   padding: 2em 4em;
//   transition: background 0.3s;
// `;

// // Props르 넘어온 style 계산
// const buttonStyle = css`
//   background-color: ${background[variant!]};
//   back
//     color: ${fontColor};
//     border: ${border};
//     font-size: ${FONT_SIZE[fontSize!]};
//     ${buttonSize[size!]}

//     &:hover {
//       background-color: ${hoverBackground[variant!]};
//     }

//     &:active{
//       background-color: ${hoverBackground[variant!]};
//     }
//   `;

const background = (props: ButtonPropsInterface) =>
  css`
    background-color: ${props.variant === 'contained' ? PALETTE.BRAND400 : PALETTE.WHITE100};
    &:hover {
      background-color: ${props.variant === 'contained' ? PALETTE.BRAND500 : PALETTE.WHITE200};
    }
  `;

export const Button = styled.button`
  outline: none;
  border: none;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  border-radius: ${BORDER_RADIUS.XS};
  font-weight: bold;
  color: #000;
  font-size: 1rem;
  padding: 2em 4em;
  transition: background 0.3s;
  ${background}
`;
