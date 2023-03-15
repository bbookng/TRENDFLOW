import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import * as S from './index.styles';

interface BasicModalPropsInterface {
  children?: React.ReactNode;
  handleModal?: () => void;
}

const BasicModal = ({ children = '기본모달', handleModal }: BasicModalPropsInterface) => {
  return (
    <S.Dim onClick={handleModal}>
      <S.ModalContainer>
        <Typography variant="H2" color="black" weight="bold">
          호달달
        </Typography>

        <Typography variant="LARGE" color="black" weight="normal">
          {children}
        </Typography>

        <Button variant="contained" size="SMALL" onClick={handleModal}>
          확인
        </Button>
      </S.ModalContainer>
    </S.Dim>
  );
};

export default BasicModal;
