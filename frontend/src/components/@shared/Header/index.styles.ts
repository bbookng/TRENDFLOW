import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid ${({ theme }) => theme.headerBorder};
  background-color: ${({ theme }) => theme.background};
  padding: 0 2rem;
  z-index: 10;

  @media ${MEDIA_QUERY.DESKTOP} {
    display: none;
  }
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > svg {
    cursor: pointer;
  }
`;
