/* eslint-disable react/require-default-props */
import React, { ElementType } from 'react';
import * as S from './index.styles';

export interface TypographyPropsInterface {
  children: React.ReactNode;
  variant: 'H1' | 'H2' | 'H3' | 'H4' | 'LARGE' | 'BASE' | 'SMALL' | 'X_SMALL';
  color?: string;
  weight?: string;
}

/**
 *
 * @param {React.ReactNode} children
 * @param {string} variant font-size
 * @param {string?} color color
 * @param {string} weight font-weight
 */
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
