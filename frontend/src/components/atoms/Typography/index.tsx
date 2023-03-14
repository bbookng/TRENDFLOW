/* eslint-disable react/require-default-props */
import { ElementType } from 'react';
import * as S from './index.styles';

export interface TypographyPropsInterface {
  children?: React.ReactNode;
  variant?: 'H1' | 'H2' | 'H3' | 'H4' | 'LARGE' | 'BASE' | 'SMALL' | 'X_SMALL';
  color: string;
  weight: 'normal' | 'bold';
}

const Typography = (props: TypographyPropsInterface) => {
  const { children, variant } = props;

  const tag = variant && variant.match(/^H/) ? `h${variant.substring(1)}` : 'p';
  return (
    <S.Typography as={tag as ElementType} {...props}>
      {children}
    </S.Typography>
  );
};

export default Typography;
