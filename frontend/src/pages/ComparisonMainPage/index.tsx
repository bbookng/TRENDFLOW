import Lottie from 'lottie-react';
import { Typography } from '@/components/atoms';
import { CompareSearchBar } from '@/components/molecules';
import balanceScaleLottie from '@/assets/lotties/balanceScaleLottie.json';
import * as S from './index.styles';

const ComparisonMainPage = () => {
  return (
    <S.Wrapper>
      <CompareSearchBar />
      <S.TitleWrapper>
        <S.TextWrapper>
          <Typography variant="H4">두 가지 키워드를</Typography>
          <Typography variant="H4">한 번에 비교해보세요!</Typography>
        </S.TextWrapper>
        <S.TextWrapper>
          <Typography variant="BASE">차이점을 한눈에 확인할 수 있을 거임띠</Typography>
          <Typography variant="BASE">우와 편리해</Typography>
        </S.TextWrapper>

        <S.LottieWrapper>
          <Lottie animationData={balanceScaleLottie} />
        </S.LottieWrapper>
      </S.TitleWrapper>
    </S.Wrapper>
  );
};

export default ComparisonMainPage;
