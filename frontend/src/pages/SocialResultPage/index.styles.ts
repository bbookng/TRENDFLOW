import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { Img } from '@/components/atoms';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { MEDIA_QUERY, BREAK_POINTS, MOBILE_MIN_WIDTH, MOBILE_MAX_WIDTH } from '@/constants/media';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: ${MOBILE_MIN_WIDTH}px;
  max-width: ${MOBILE_MAX_WIDTH}px;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: ${BREAK_POINTS.DESKTOP};
    max-width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2rem;
  @media ${MEDIA_QUERY.DESKTOP} {
    gap: 0;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const BookmarkBtn = styled.button`
  width: 1.75rem;
  margin-left: 1rem;
  background-color: transparent;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export const HighLight = styled.span`
  color: ${PALETTE.BRAND400};
  font-weight: bold;
`;

export const DateSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 2.215rem;
`;

export const ChartWrapper = styled.div``;
export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const Icon = styled(Img)`
  margin: 0 1rem;
`;

export const DateWrapper = styled.div`
  width: auto;
`;

export const SpaceTypography = styled(Typography)`
  margin: 0 0.5rem;
`;

// 차트 부분
export const KeywordContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 2.875rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;

    & > div:first-of-type {
      margin-right: 2.5rem;
    }
  }
`;

export const RelatedKeywordContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 45%;
  }
`;

export const TrendChartContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    & > div:first-of-type {
      margin-right: 2.5rem;
      margin-bottom: 0;
    }
  }
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
  }
`;
