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

    & > form {
      margin-top: 2rem;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12%;

  & > div:first-of-type {
    margin-bottom: 1rem;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h4:first-of-type {
    margin-bottom: 0.2rem;
  }

  & > p:first-of-type {
    margin-bottom: 0.15rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;

    & > h4:first-of-type {
      margin-bottom: 0;
      margin-right: 0.375rem;
    }

    & > p:first-of-type {
      margin-bottom: 0;
      margin-right: 0.25rem;
    }
  }
`;

export const LottieWrapper = styled.span`
  width: 320px;
  margin-top: 3rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 420px;
  }
`;
