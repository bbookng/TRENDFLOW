import React from 'react';
import * as S from './index.styles';

interface HamburgerPropsInterface {
  openMenu: boolean;
  onClick: () => void;
}

const Hamburger = ({ openMenu, onClick }: HamburgerPropsInterface) => {
  return (
    <S.HamburgerContainer onClick={onClick} css={openMenu && S.open}>
      <S.Span></S.Span>
      <S.Span></S.Span>
      <S.Span></S.Span>
    </S.HamburgerContainer>
  );
};
export default Hamburger;
