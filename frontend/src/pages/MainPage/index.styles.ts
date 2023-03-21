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
