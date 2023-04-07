import React from 'react';
import Header from '@/components/@shared/Header';

import * as S from './index.styles';
import Navbar from '@/components/@shared/Navbar';
import DarkModeFixBtn from '@/components/molecules/DarkModeFixBtn';

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
      <DarkModeFixBtn />
    </S.Layout>
  );
};

export default BaseLayout;
