import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS, BOX_SHADOW } from '@/constants/styles';
import { PaperPropsInterface } from '@/components/atoms/Paper';

export const Paper = styled.div<PaperPropsInterface>`
  display: inline-block;
  background-color: ${PALETTE.WHITE100};
  box-shadow: ${BOX_SHADOW.BLACK_SM};
  border-radius: ${BORDER_RADIUS.LG};
  padding: 2rem;
`;
