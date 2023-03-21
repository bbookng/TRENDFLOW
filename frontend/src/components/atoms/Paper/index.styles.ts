import styled from '@emotion/styled';
import { BORDER_RADIUS, BOX_SHADOW } from '@/constants/styles';
import { PaperPropsInterface } from '@/components/atoms/Paper';

export const Paper = styled.div<PaperPropsInterface>`
  display: inline-block;
  background-color: ${({ theme }) => theme.contentBackground};
  box-shadow: ${BOX_SHADOW.BLACK_SM};
  border-radius: ${BORDER_RADIUS.LG};
  padding: 2rem;
`;
