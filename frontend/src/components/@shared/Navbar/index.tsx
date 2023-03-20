import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import { Logo, Social, Youtube, Compare } from '@/assets';
import { ROUTER_PATH } from '@/constants/path';

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
  const navi = useNavigate();

  return (
    <S.Navbar>
      <Logo onClick={() => navi('/')} />
      {navList.map((item) => (
        <S.NavItem key="item.title" to={item.link}>
          <S.NavIcon>{item.icon}</S.NavIcon>
          {item.title}
        </S.NavItem>
      ))}
    </S.Navbar>
  );
};

export default Navbar;
