import React from 'react';
import Header from '@/components/@shared/Header';

import * as S from './index.styles';
import Navbar from '@/components/@shared/Navbar';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <S.Layout>
      <Header />
      <Navbar />
      <S.Main>
        <S.Container>{children}</S.Container>
      </S.Main>
    </S.Layout>
  );
};

export default BaseLayout;
