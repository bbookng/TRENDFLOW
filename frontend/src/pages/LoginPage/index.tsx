import { Outlet } from 'react-router-dom';
import * as S from './index.styles';

const LoginPage = () => {
  return (
    <S.Wrapper>
      로그인중입니다.
      <Outlet />
    </S.Wrapper>
  );
};

export default LoginPage;
