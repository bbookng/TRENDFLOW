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
  return (
    <ModalFrame handleClickModalClose={handleClickModalClose} width={width} height={height}>
      <S.Wrapper>
        <S.Logo>{isDark ? <DarkLogo /> : <Logo />}</S.Logo>
        <S.ButtonContainer>
          <S.Button>
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
