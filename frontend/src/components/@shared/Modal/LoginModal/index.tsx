import { DarkLogo, Google, Kakao, Logo } from '@/assets';
import ModalFrame from '@/components/@shared/Modal/ModalFrame';
import { Typography } from '@/components/atoms';
import { useAppSelector } from '@/hooks/storeHook';
import * as S from './index.styles';

interface Props {
  handleClickModalClose: () => void;
  width: string;
  height: string;
}

const LoginModal = ({ handleClickModalClose, width, height }: Props): React.ReactElement => {
  const { isDark } = useAppSelector((state) => state);
  const handleLogin = () => {
    const { VITE_API_URL: BASE_URL } = import.meta.env;
    const REST_API_KEY = '6e9502bc3ecab5f6997c9d97a8f9a933';
    const REDIRECT_URI = `http://${BASE_URL}/login/kakao`;
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_URL;
  };

  return (
    <ModalFrame handleClickModalClose={handleClickModalClose} width={width} height={height}>
      <S.Wrapper>
        <S.Logo>{isDark ? <DarkLogo /> : <Logo />}</S.Logo>
        <S.ButtonContainer>
          <S.Button onClick={handleLogin}>
            <Kakao />
            <Typography variant="BASE" weight="400">
              카카오 계정으로 로그인
            </Typography>
          </S.Button>
          <S.Button>
            <Google />
            <Typography variant="BASE" weight="400">
              구글 계정으로 로그인
            </Typography>
          </S.Button>
        </S.ButtonContainer>
        <S.Footer>
          <Typography variant="X_SMALL">서비스 관련 문의사항이 있을 경우,</Typography>
          <Typography variant="X_SMALL">trendflow@gmail.com으로 문의하시기 바랍니다.</Typography>
        </S.Footer>
      </S.Wrapper>
    </ModalFrame>
  );
};

export default LoginModal;
