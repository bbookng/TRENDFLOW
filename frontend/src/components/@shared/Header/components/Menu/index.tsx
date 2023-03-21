import * as S from './index.styles';
import { useAppSelector } from '@/hooks/storeHook';
import { DarkLogo, Logo } from '@/assets';

interface MenuPropsInterface {
  openMenu: boolean;
  onClick: () => void;
}

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
      </S.Container>
    </>
  );
};

export default Menu;
