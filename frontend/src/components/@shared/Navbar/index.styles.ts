import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { MEDIA_QUERY } from '@/constants/media';
import { PALETTE } from '@/constants/palette';

export const Navbar = styled.div`
  display: none;
  position: fixed;
  width: 15rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.contentBackground};
  z-index: 1000;

  & > svg {
    margin: 5rem auto 4.5rem;
    cursor: pointer;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  padding: 0 3.25rem;

  color: ${({ theme }) => theme.text200};
  font-weight: 400;

  svg {
    fill: ${({ theme }) => theme.text200};
    margin: 0;
  }

  &:hover,
  &.active {
    color: ${PALETTE.BRAND400};
    background-color: ${PALETTE.BRAND100};
    border-right: 3px ${PALETTE.BRAND400} solid;
    font-weight: 600;

    svg {
      fill: ${PALETTE.BRAND400};
    }
  }
`;

export const NavIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 2rem;
`;
