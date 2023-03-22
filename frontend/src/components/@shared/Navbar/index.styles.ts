import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import { BORDER_RADIUS } from '../../../constants/styles';
import { MEDIA_QUERY } from '@/constants/media';
import { PALETTE } from '@/constants/palette';

interface NavbarProps {
  isNavbar: boolean;
}

const close = css`
  transform: translateX(-240px);
`;

export const Navbar = styled.div<NavbarProps>`
  display: none;
  position: fixed;
  width: 15rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.contentBackground};
  z-index: 1000;
  transition: all 600ms ease-in-out;

  /* 로고 */
  & > svg {
    margin: 5rem auto 4.5rem;
    cursor: pointer;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${(props) => props.isNavbar && close}
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 3.25rem;

  color: ${({ theme }) => theme.navNotSelected};
  font-weight: 400;

  svg {
    fill: ${({ theme }) => theme.text200};
    margin: 0;
  }

  &:hover,
  &.active {
    color: ${({ theme }) => theme.navSelected};
    background-color: ${({ theme }) => theme.navBackground};
    border-right: 3px ${PALETTE.BRAND500} solid;
    font-weight: 500;

    svg {
      fill: ${({ theme }) => theme.navSelected};
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

export const NavUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 2rem;
  width: 12.5rem;
  height: 2.5rem;
  border-radius: ${BORDER_RADIUS.XL};

  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  /* color: ${PALETTE.BRAND400}; */
`;
