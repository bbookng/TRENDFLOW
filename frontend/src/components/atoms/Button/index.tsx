/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Ripples from 'react-ripples';
import * as S from './index.styles';

export interface ButtonPropsInterface {
  children?: React.ReactNode;
  variant?: 'contained' | 'outlined';
  fontSize?: 'LARGE' | 'BASE' | 'SMALL' | 'X_SMALL';
  size?: 'LARGE' | 'MEDIUM' | 'SMALL';
  borderSize?: string;
  isDark?: boolean;
  weight?: 'string';
  onClick?: () => void;
}

/**
 *
 * @param variant
 * @param fontSize
 * @param size
 * @param onClick
 * @returns
 */
const Button = (props: ButtonPropsInterface) => {
  const { children, onClick } = props;

  return (
    <Ripples color="rgba(221, 220, 222, 0.4)" during={700}>
      <S.Button {...props} onClick={onClick}>
        {children}
      </S.Button>
    </Ripples>
  );
};

export default Button;
