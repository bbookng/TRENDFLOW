import styled from '@emotion/styled';
import { MEDIA_QUERY, MOBILE_MAX_WIDTH } from '../../constants/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${MOBILE_MAX_WIDTH}px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: auto;
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
    width: 100%;

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

    & > h2:last-of-type {
      margin-top: 0;
      margin-left: 0.5rem;
    }
  }
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    justify-content: space-between;
    margin: 4rem 0 3rem 0;

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
