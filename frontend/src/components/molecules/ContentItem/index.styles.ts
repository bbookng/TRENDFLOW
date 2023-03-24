import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS } from '@/constants/styles';

export const ContentItemPaper = styled(Paper)`
  background-color: ${({ theme }) => theme.contentBackground};
  border-radius: ${BORDER_RADIUS.MD};
  border: 1px solid ${PALETTE.WHITE300};
  padding: 1rem;
`;
