import styled from '@emotion/styled';

export const Wrapper = styled.div<{ size: number }>`
  & > svg {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;
