import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const handleMenuState = () => {
    setOpenMenu(!openMenu);
  };

  // URL이 변경될 때마다 모바일 Header 상태 false로 바꿔서 집어넣음
  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

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
