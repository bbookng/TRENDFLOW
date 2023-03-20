import * as S from './index.styles';
import { ReactComponent as Logo } from '@/assets/logos/logo.svg';

interface MenuPropsInterface {
  openMenu: boolean;
  onClick: () => void;
}

const Menu = ({ openMenu, onClick }: MenuPropsInterface) => {
  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  return (
    <>
      <S.Dim css={openMenu && S.dimVisible} onClick={click} />
      <S.Container css={openMenu && S.open}>
        <S.Contents>
          <Logo />
        </S.Contents>
      </S.Container>
    </>
  );
};

export default Menu;
