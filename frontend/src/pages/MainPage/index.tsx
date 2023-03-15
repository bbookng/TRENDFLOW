import Button from '@/components/atoms/Button';
import Paper from '@/components/atoms/Paper';
import Typography from '@/components/atoms/Typography';
import FilpBadge from '@/components/molecules/FlipBadge';
import SearchBar from '@/components/molecules/SearchBar';
import { Container } from '@/pages/MainPage/index.styles';

const MainPage = () => {
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
      <FilpBadge count="99%" changed="20%p" color="red" width="120px" />

      <Paper>
        <FilpBadge count="99%" changed="20%p" color="red" width="120px" />
      </Paper>
    </Container>
  );
};

export default MainPage;
