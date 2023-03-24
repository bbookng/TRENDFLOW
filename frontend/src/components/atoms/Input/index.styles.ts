import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Input = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${PALETTE.BLACK100};
  }

  &:focus {
    outline: none;
  }
`;
