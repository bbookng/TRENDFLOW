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
