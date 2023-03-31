import styled from '@emotion/styled';
import { MEDIA_QUERY } from '../../constants/media';

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > h2 {
    margin-top: 50px;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & > h2 {
      margin-top: 0;
    }
  }
`;
