import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Input = styled.input`
  color: ${PALETTE.BLACK400};
  &::placeholder {
    color: ${PALETTE.BLACK100};
  }

  &:focus {
    outline: none;
  }
`;
