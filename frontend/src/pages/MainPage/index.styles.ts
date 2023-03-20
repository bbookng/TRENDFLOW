import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HotKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3rem;
  margin-bottom: 2.5rem;

  & > div:nth-of-type(1) {
    margin-bottom: 2.5rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;

    & > div:nth-of-type(1) {
      margin-bottom: 0;
      margin-right: 2.5rem;
    }
  }
`;
