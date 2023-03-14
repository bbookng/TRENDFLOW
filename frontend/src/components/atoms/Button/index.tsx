/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { css } from '@emotion/react';
import Ripples from 'react-ripples';
import { action } from '@storybook/addon-actions';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS, FONT_SIZE } from '@/constants/styles';

interface Props {
  children?: React.ReactNode;
  variant?: 'contained' | 'outlined';
  fontSize?: 'LARGE' | 'BASE' | 'SMALL' | 'X_SMALL';
  size?: 'LARGE' | 'MEDIUM' | 'SMALL';
  onClick?: () => void;
}

// variant따라서 채워진것과 안채워진거 구분
const Button = ({ children, variant, fontSize, onClick, size }: Props) => {
  const background = {
    contained: PALETTE.BRAND400,
    outlined: PALETTE.WHITE100,
  };
  const hoverBackground = {
    contained: PALETTE.BRAND500,
    outlined: PALETTE.WHITE200,
  };
  const fontColor = variant === 'contained' ? PALETTE.WHITE100 : PALETTE.BRAND400;
  const border = variant === 'outlined' ? `1px solid ${PALETTE.BRAND400}` : 'none';

  const buttonSize = {
    LARGE: css`
      padding: 1em 8em;
    `,
    MEDIUM: css`
      padding: 1em 6em;
    `,
    SMALL: css`
      padding: 1em 4em;
    `,
  };

  // Button 기본 스타일 지정
  const defaultStyle = css`
    outline: none;
    border: none;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    border-radius: ${BORDER_RADIUS.XS};
    font-weight: bold;
    color: ${fontColor};
    font-size: 1rem;
    padding: 2em 4em;
    transition: background 0.3s;
  `;

  // Props르 넘어온 style 계산
  const buttonStyle = css`
  background-color: ${background[variant!]};
  back
    color: ${fontColor};
    border: ${border};
    font-size: ${FONT_SIZE[fontSize!]};
    ${buttonSize[size!]}

    &:hover {
      background-color: ${hoverBackground[variant!]};
    }

    &:active{
      background-color: ${hoverBackground[variant!]};
    }
  `;

  const onClickButton = () => {
    console.log('click');
  };

  return (
    <Ripples color="rgba(221, 220, 222, 0.4)" during={700}>
      <button type="button" onClick={onClickButton} css={[defaultStyle, buttonStyle]}>
        {children}
      </button>
    </Ripples>
  );
};

export default Button;
