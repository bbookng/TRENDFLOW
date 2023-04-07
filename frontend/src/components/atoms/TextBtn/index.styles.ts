import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const TextBtn = styled.button`
  background-color: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: ${PALETTE.WHITE400};
  &:hover {
    text-decoration: underline;
  }
`;
