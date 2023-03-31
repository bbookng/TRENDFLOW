import styled from '@emotion/styled';
import { MEDIA_QUERY, MOBILE_MAX_WIDTH } from '@/constants/media';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: ${MOBILE_MAX_WIDTH}px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: auto;
    max-width: 100%;
  }
`;

export const HotKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;

  & > div:nth-of-type(1) {
    margin-bottom: 3rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    margin: 4rem 0 3rem 0;

    & > div:nth-of-type(1) {
      margin-bottom: 0;
      margin-right: 2.5rem;
    }
  }
`;

export const LineWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin: 4rem 0 3rem 0;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
  }
`;

export const Box = styled.div`
  display: flex;
  width: 100%;
  height: 300px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 48%;
    height: 400px;
  }
`;
