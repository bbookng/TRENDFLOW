import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Input = styled.input`
  padding: 0.4rem 1rem;
  color: ${PALETTE.BLACK400};
  &::placeholder {
    color: ${PALETTE.BLACK100};
  }

  &:focus {
    outline: none;
  }
`;
