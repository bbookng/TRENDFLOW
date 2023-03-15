import React from 'react';
import Header from '@/components/@shared/Header';

import * as S from './index.styles';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <S.Container>
      <Header></Header>
      <S.Contents>{children}</S.Contents>
    </S.Container>
  );
};

export default BaseLayout;
