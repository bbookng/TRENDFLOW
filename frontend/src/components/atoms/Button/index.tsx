/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { css } from '@emotion/react';
import Ripples from 'react-ripples';
import { PALETTE } from '@/constants/palette';
import * as S from './index.styles';

export interface ButtonPropsInterface {
  children?: React.ReactNode;
  variant?: 'contained' | 'outlined';
  fontSize?: 'LARGE' | 'BASE' | 'SMALL' | 'X_SMALL';
  size?: 'LARGE' | 'MEDIUM' | 'SMALL';
  onClick?: () => void;
}

const Button = (props: ButtonPropsInterface) => {
  const { children, variant, fontSize, onClick, size } = props;

  return (
    <Ripples color="rgba(221, 220, 222, 0.4)" during={700}>
      <S.Button {...props}>{children}</S.Button>
    </Ripples>
  );
};

export default Button;
