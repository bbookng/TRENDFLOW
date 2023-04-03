import styled from '@emotion/styled';
import {
  BREAK_POINTS,
  MEDIA_QUERY,
  MOBILE_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
} from '../../constants/media';

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
  flex-direction: column;
  align-items: flex-start;

  & > div {
    margin-top: 50px;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    & > div {
      margin-top: 0;
    }
  }
`;

export const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:last-of-type {
    margin-top: 0.5rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    margin-right: 2.5rem;

    & > h2:last-of-type {
      margin-top: 0;
      margin-left: 0.5rem;
    }
  }
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0 5rem;

  & > div:nth-of-type(1) {
    margin-bottom: 3rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    justify-content: space-between;
    margin: 4rem 0 1rem 0;

    & > div:first-of-type {
      margin-right: 2.5rem;
    }
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
