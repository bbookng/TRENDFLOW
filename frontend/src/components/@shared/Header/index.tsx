import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import Hamburger from '@/components/@shared/Header/components/Hamburger';
import Menu from '@/components/@shared/Header/components/Menu';
import { Logo, DarkLogo } from '@/assets';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { toggleTheme } from '@/store/slices/themeSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isDark } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navi = useNavigate();
  const handleMenuState = () => {
    setOpenMenu(!openMenu);
  };

  const handleIsDarkState = () => dispatch(toggleTheme());

  return (
    <S.Header>
      <S.Inner>
        <Hamburger openMenu={openMenu} onClick={handleMenuState}></Hamburger>
        {isDark ? <DarkLogo onClick={() => navi('/')} /> : <Logo onClick={() => navi('/')} />}
        <button type="button" onClick={handleIsDarkState}>
          토글 버튼
        </button>
      </S.Inner>
      <Menu onClick={handleMenuState} openMenu={openMenu} />
    </S.Header>
  );
};
export default Header;
