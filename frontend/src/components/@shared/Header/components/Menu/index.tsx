import * as S from './index.styles';
import { useAppSelector } from '@/hooks/storeHook';
import { Compare, DarkLogo, Logo, Social, Youtube } from '@/assets';
import { ROUTER_PATH } from '@/constants/path';

interface MenuPropsInterface {
  openMenu: boolean;
  onClick: () => void;
}

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

const Menu = ({ openMenu, onClick }: MenuPropsInterface) => {
  const { isDark } = useAppSelector((state) => state);
  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  return (
    <>
      <S.Dim css={openMenu && S.dimVisible} onClick={click} />
      <S.Container css={openMenu && S.open}>
        <S.Contents>{isDark ? <DarkLogo /> : <Logo />}</S.Contents>
        <S.NavList>
          {navList.map((item) => (
            <S.NavItem key="item.title" to={item.link}>
              <S.NavIcon>{item.icon}</S.NavIcon>
              {item.title}
            </S.NavItem>
          ))}
        </S.NavList>
      </S.Container>
    </>
  );
};

export default Menu;
