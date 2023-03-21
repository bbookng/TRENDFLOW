import styled from '@emotion/styled';

export const Wrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
`;
