import styled from '@emotion/styled';
import { MOBILE_MIN_WIDTH } from '@/constants/media';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS } from '@/constants/styles';

export const NoBookmarkPaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: ${MOBILE_MIN_WIDTH}px;
  height: 20rem;
  padding: 2rem;
  color: ${PALETTE.BRAND400};
  background-color: transparent;
  border: 1px dashed ${PALETTE.BRAND400};
  border-radius: ${BORDER_RADIUS.LG};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.725rem;

  & p:first-of-type {
    margin-bottom: 0.25rem;
  }
`;
