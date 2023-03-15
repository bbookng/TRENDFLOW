import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { Container } from '@/pages/MainPage/index.styles';
import PortalProvider from '@/components/@shared/PortalProvider';
import BasicModal from '@/components/@shared/modals/BasicModal';

const MainPage = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Container>
      <h1>MainPage</h1>
      <p>메인 페이지 입니다.</p>
      <Button variant="contained" fontSize="X_SMALL" size="SMALL">
        기본버튼
      </Button>
      <Typography variant="BASE" weight="normal" color="black">
        김수민
      </Typography>

      <Button variant="contained" size="LARGE" onClick={openModal}>
        열려라 모달!!!
      </Button>
      {modal && (
        <PortalProvider>
          <BasicModal handleModal={closeModal}>베이직</BasicModal>
        </PortalProvider>
      )}
    </Container>
  );
};

export default MainPage;
