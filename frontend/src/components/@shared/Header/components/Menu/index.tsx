import Typography from '@/components/atoms/Typography';
import * as S from './index.styles';

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
          <Typography variant="H1">LOGO</Typography>
        </S.Contents>
      </S.Container>
    </>
  );
};

export default Menu;
