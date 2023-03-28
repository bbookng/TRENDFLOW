import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { Img } from '@/components/atoms';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { MEDIA_QUERY } from '@/constants/media';

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const TypeWrapper = styled.div`
  margin-top: 3.18rem;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-top: 0;
  }
`;

export const HighLight = styled.span`
  color: ${PALETTE.BRAND400};
  font-weight: bold;
`;

export const DataSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 2.215rem;
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
export const CustomDataPicker = styled.button`
  background-color: transparent;
  font-size: 1.25rem;
`;

// 차트 부분
export const KeywordContentsWrapper = styled.div`
  margin-top: 2.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 350px;
  justify-content: space-between;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    height: 510px;
  }
`;

export const BarChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 50%;
  }
`;
export const RelatedKeywordContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 45%;
  }
`;

export const TrendChartContentsWrapper = styled.div`
  margin-top: 2.875rem;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    height: 560px;
  }
`;

export const RelatedPostWrapper = styled.div`
  margin-top: 2.875rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
  }
`;
