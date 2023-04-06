import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Lottie from 'lottie-react';
import { Divider, Typography } from '@/components/atoms';
import { useGetRecommendKeywordsQuery } from '@/apis/keyword';
import ButtonSkeleton from '@/components/atoms/Button/Skeleton';
import { SearchBar } from '@/components/molecules';
import { ROUTER_PATH } from '@/constants/path';
import searchLottie from '@/assets/lotties/searchLottie.json';
import * as S from './index.styles';

export interface BoxInterface {
  marginTopBottom?: string;
}

const SocialMainPage = () => {
  const navi = useNavigate();
  const theme = useTheme();
  const {
    data: recommendKeywords,
    isLoading,
    isError,
  } = useGetRecommendKeywordsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <S.SearchWrapper>
        <SearchBar placeholder="키워드를 입력하세요" />
      </S.SearchWrapper>
      <S.Contents>
        <S.Left>
          <Lottie animationData={searchLottie} />
        </S.Left>
        <S.Right>
          <S.Wrapper>
            <S.TypoBox marginTopBottom="2">
              <Typography variant="H4" color={theme.text} weight="bold">
                분석하고 싶은 키워드를
              </Typography>
              <Typography variant="H4" color={theme.text} weight="bold">
                검색해보세요.
              </Typography>
            </S.TypoBox>

            <S.TypoBox marginTopBottom="1">
              <Typography variant="BASE" color={theme.text}>
                여러 소셜 미디어를 종합하여 분석한{' '}
              </Typography>
              <Typography variant="BASE" color={theme.text}>
                언급량, 긍정 지수 등등 알려드랴용
              </Typography>
            </S.TypoBox>
          </S.Wrapper>

          <Divider type="dashed" direction="horizontal" width={2} length="100%" />

          <S.Wrapper>
            <S.TypoBox marginTopBottom="2">
              <Typography variant="H4" color={theme.text}>
                이런 키워드는 어떠세요?
              </Typography>
            </S.TypoBox>

            <S.KeywordBox>
              {!recommendKeywords
                ? [...Array(10).keys()].map((key) => (
                    <S.KeywordInvisible key={key} size="SMALL">
                      .
                    </S.KeywordInvisible>
                    // <S.KeywordSkeleton key={key} size="SMALL">
                    //   .
                    // </S.KeywordSkeleton>
                  ))
                : recommendKeywords?.map((keyword) => (
                    <S.Keyword
                      variant="outlined"
                      fontSize="BASE"
                      size="SMALL"
                      borderSize="2"
                      key={keyword.id}
                      onClick={() =>
                        navi(`/${ROUTER_PATH.SOCIAL_RESULT_PAGE}`, {
                          state: { keyword: keyword.keyword },
                        })
                      }
                    >
                      {keyword.keyword}
                    </S.Keyword>
                  ))}
            </S.KeywordBox>
          </S.Wrapper>
        </S.Right>
      </S.Contents>
    </>
  );
};

export default SocialMainPage;
