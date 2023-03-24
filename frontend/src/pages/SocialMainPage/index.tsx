import { Divider, Paper, Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import { PALETTE } from '@/constants/palette';
import * as S from './index.styles';

export interface BoxInterface {
  marginTopBottom?: string;
}

const SocialMainPage = () => {
  return (
    <>
      <S.SearchWrapper>
        <SearchBar />
      </S.SearchWrapper>
      <S.Contents>
        <S.Left></S.Left>
        <S.Right>
          <S.Wrapper>
            <S.Box marginTopBottom="2">
              <Typography variant="H2" color={PALETTE.BLACK400} weight="bold">
                분석하고 싶은 키워드를 검색해보세요.
              </Typography>
            </S.Box>

            <S.Box marginTopBottom="1">
              <Typography variant="LARGE" color={PALETTE.BLACK400}>
                여러 소셜 미디어를 종합하여 분석한 언급량, 긍정 지수 등등 알려드랴용
              </Typography>
            </S.Box>
          </S.Wrapper>

          <Divider type="dashed" direction="horizontal" width={2} length="100%" />

          <S.Wrapper>
            <S.Box marginTopBottom="2">
              <Typography variant="H3" color={PALETTE.BLACK400} weight="bold">
                이런 키워드는 어떠세요 ?
              </Typography>
            </S.Box>

            <S.Box>
              <S.Keyword variant="outlined" fontSize="BASE" size="SMALL">
                이번주
              </S.Keyword>
            </S.Box>
          </S.Wrapper>
        </S.Right>
      </S.Contents>
    </>
  );
};

export default SocialMainPage;
