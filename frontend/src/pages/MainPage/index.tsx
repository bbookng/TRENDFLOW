import Button from '@/components/atoms/Button';
import { Container } from '@/pages/MainPage/index.styles';

const MainPage = () => {
  return (
    <Container>
      <h1>MainPage</h1>
      <p>메인 페이지 입니다.</p>
      <Button variant="contained" fontSize="X_SMALL" size="SMALL">
        기본버튼
      </Button>
    </Container>
  );
};

export default MainPage;
