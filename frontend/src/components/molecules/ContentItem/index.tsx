import * as S from './index.styles';
import testImg from '@/assets/images/test.jpg';
import { Img, Typography } from '@/components/atoms';

const ContentItem = () => {
  return (
    <S.Wrapper>
      <Img src={testImg} width="120px" height="75px"></Img>
      <S.ContentsWrapper>
        <Typography variant="BASE" weight="bold">
          제목이 들어갈 자리입니다.
        </Typography>
        <S.DescriptionTypography variant="SMALL">
          본문 내용이 들어갈 자리입니도. <br /> 두문장은 너무 긴가예?
        </S.DescriptionTypography>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
};

export default ContentItem;
