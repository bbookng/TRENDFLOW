import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Paper from '@/components/atoms/Paper';
import Typography from '@/components/atoms/Typography';
import FilpBadge from '@/components/molecules/FlipBadge';
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

      <Paper>
        <FilpBadge count="99%" changed="20%p" color="red" width="120px" />
      </Paper>
    </Container>
  );
};

export default MainPage;
