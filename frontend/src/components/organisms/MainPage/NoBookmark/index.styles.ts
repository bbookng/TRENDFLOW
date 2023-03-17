import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS } from '@/constants/styles';

export const NoBookmarkPaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
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
`;
