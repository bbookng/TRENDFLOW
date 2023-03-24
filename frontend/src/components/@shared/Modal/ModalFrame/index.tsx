import ModalPortal from '@/components/@shared/Modal/ModalPortal';
import * as S from './index.styles';

interface Props {
  children: React.ReactNode;
  handleClickModalClose: () => void;
  width: string;
  height: string;
}

const ModalFrame = ({
  children,
  handleClickModalClose,
  width,
  height,
}: Props): React.ReactElement => {
  return (
    <ModalPortal>
      <S.Dim onClick={handleClickModalClose}>
        <S.ModalContainer width={width} height={height}>
          {children}
        </S.ModalContainer>
      </S.Dim>
    </ModalPortal>
  );
};

export default ModalFrame;
