import * as S from './index.styles';
import Hamburger from '@/components/@shared/Header/components/Hamburger';
import Menu from '@/components/@shared/Header/components/Menu';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuState = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <S.Header>
      <Hamburger openMenu={openMenu} onClick={handleMenuState}></Hamburger>
      <Menu onClick={handleMenuState} openMenu={openMenu} />
    </S.Header>
  );
};
export default Header;
