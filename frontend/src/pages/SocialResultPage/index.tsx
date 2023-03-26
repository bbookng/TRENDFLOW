import { Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';

const SocialResultPage = () => {
  return (
    <S.TitleWrapper>
      <S.TypeWrapper>
        <Typography variant="H2">
          <S.HighLight>삼성전자</S.HighLight> 소셜 분석 리포트
        </Typography>
      </S.TypeWrapper>
      <SearchBar />
    </S.TitleWrapper>
  );
};

export default SocialResultPage;
