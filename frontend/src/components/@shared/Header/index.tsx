import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import Hamburger from '@/components/@shared/Header/components/Hamburger';
import Menu from '@/components/@shared/Header/components/Menu';
import { Logo, DarkLogo } from '@/assets';
import { useAppSelector } from '@/hooks/storeHook';
import DarkModeBtn from '@/components/molecules/DarkModeBtn';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isDark } = useAppSelector((state) => state);
  const navi = useNavigate();
  const handleMenuState = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <S.Header>
      <S.Inner>
        <Hamburger openMenu={openMenu} onClick={handleMenuState}></Hamburger>
        {isDark ? <DarkLogo onClick={() => navi('/')} /> : <Logo onClick={() => navi('/')} />}
        <DarkModeBtn />
      </S.Inner>
      <Menu onClick={handleMenuState} openMenu={openMenu} />
    </S.Header>
  );
};
export default Header;
