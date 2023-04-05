import { useTheme } from '@emotion/react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeLottie from '@/assets/lotties/youtubeLottie.json';
import { Divider, Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';
import { useAppSelector } from '@/hooks/storeHook';
import { SocialContentInterface } from '@/types/social';
import { CONTENT_CODE } from '@/constants/code';
import { getDateToYYYYDDMM, getSevenDaysAgoDate } from '@/utils/date';
import { getContents } from '@/apis/analyze';
import { Youtube2 } from '@/assets';
import Svg from '@/components/atoms/Svg';

const YoutubeMainPage = () => {
  const theme = useTheme();
  const navi = useNavigate();
  const { bestHotKeyword } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [youtubeList, setYoutubeList] = useState<Array<SocialContentInterface>>([]);

  const getData = async (keyword: string) => {
    setIsLoading(true);
    const { data } = await getContents(
      keyword,
      CONTENT_CODE.YOUTUBE,
      1,
      4,
      getDateToYYYYDDMM(new Date()),
      getDateToYYYYDDMM(getSevenDaysAgoDate())
    );
    setYoutubeList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(bestHotKeyword);
  }, [bestHotKeyword]);

  return (
    <>
      <S.SearchWrapper>
        <SearchBar placeholder="키워드를 입력하세요" />
      </S.SearchWrapper>
      <S.Contents>
        <S.Left>
          <Lottie animationData={youtubeLottie} />
        </S.Left>
        <S.Right>
          <S.Wrapper>
            <S.TypoBox marginTopBottom="2">
              <Typography variant="H4" color={theme.text} weight="bold">
                분석하고 싶은 유튜브 링크를
              </Typography>
              <Typography variant="H4" color={theme.text} weight="bold">
                검색해보세요.
              </Typography>
            </S.TypoBox>

            <S.TypoBox marginTopBottom="1">
              <Typography variant="BASE" color={theme.text}>
                해당 유튜브 링크에 대한 기본 정보와
              </Typography>
              <Typography variant="BASE" color={theme.text}>
                댓글에 대한 선호도 분석을 해드립니다.
              </Typography>
            </S.TypoBox>
          </S.Wrapper>

          <Divider type="dashed" direction="horizontal" width={2} length="100%" />
          <S.Wrapper>
            <S.TypoBox marginTopBottom="2">
              <Typography variant="H4" color={theme.text}>
                이런 유튜브는 어떠세요?
              </Typography>
            </S.TypoBox>
          </S.Wrapper>
        </S.Right>
      </S.Contents>
      <S.FlexBox>
        {youtubeList.map((item) => {
          return item.thumbnail ? (
            <S.YoutubeItem
              key={item.id}
              onClick={() => navi('result', { state: { link: item.link } })}
            >
              <S.Thumbnail src={item.thumbnail} />
            </S.YoutubeItem>
          ) : (
            <S.YoutubeItem
              key={item.id}
              onClick={() => navi('result', { state: { link: item.link } })}
            >
              <Svg size={50}>
                <Youtube2 />
              </Svg>
              <S.Title>{item.title}</S.Title>
            </S.YoutubeItem>
          );
        })}
      </S.FlexBox>
    </>
  );
};

export default YoutubeMainPage;
