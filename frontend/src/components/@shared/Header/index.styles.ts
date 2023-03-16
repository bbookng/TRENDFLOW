import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  border-bottom: 0.5px solid ${PALETTE.WHITE400};
  background-color: transparent;
  padding: 0 2rem;
  z-index: 1000;
`;
