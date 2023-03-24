import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as S from './index.styles';
import { Logo, Social, Youtube, Compare, DarkLogo } from '@/assets';
import { ROUTER_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/storeHook';
import LoginModal from '@/components/@shared/Modal/LoginModal';

const navList = [
  {
    link: `/${ROUTER_PATH.SOCIAL_MAIN_PAGE}`,
    icon: <Social />,
    title: '소셜 분석',
  },
  {
    link: `/${ROUTER_PATH.YOUTUBE_MAIN_PAGE}`,
    icon: <Youtube />,
    title: '유튜브 분석',
  },
  {
    link: `/${ROUTER_PATH.COMPARISON_MAIN_PAGE}`,
    icon: <Compare />,
    title: '비교 분석',
  },
];

const Navbar = () => {
  const {
    isDark,
    isNavbar,
    user: { isLoggedIn },
  } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);
  const navi = useNavigate();
  const handleClickBtn = () => {
    setOpen(true);
  };
  return (
    <S.Navbar isNavbar={isNavbar}>
      {isDark ? <DarkLogo onClick={() => navi('/')} /> : <Logo onClick={() => navi('/')} />}
      {navList.map((item) => (
        <S.NavItem key={item.title} to={item.link}>
          <S.NavIcon>{item.icon}</S.NavIcon>
          {item.title}
        </S.NavItem>
      ))}
      <S.NavUser isLogin={isLoggedIn} onClick={handleClickBtn}>
        {isLoggedIn ? '반갑습니다, 에헴띠님!' : '로그인'}
      </S.NavUser>
      {open && (
        <LoginModal handleClickModalClose={() => setOpen(false)} width="400px" height="360px" />
      )}
    </S.Navbar>
  );
};

export default Navbar;
