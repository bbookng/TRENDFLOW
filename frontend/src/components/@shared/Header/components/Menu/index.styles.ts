import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { BORDER_RADIUS } from '@/constants/styles';

export const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background: rgba(56, 56, 56, 0.5);
  display: none;
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  height: 100vh;
  background-color: ${({ theme }) => theme.contentBackground};
  transition: 0.3s cubic-bezier(0, 1, 1, 1.01);
`;

export const Contents = styled.div`
  margin: 110px 0 80px 0;
`;

export const dimVisible = css`
  display: block;
`;
export const open = css`
  width: 240px;
  left: 0;
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2.75rem;
  width: 100%;
  height: 3.55rem;
  color: ${({ theme }) => theme.text200};
  font-weight: 400;

  svg {
    fill: ${({ theme }) => theme.text200};
    margin: 0;
  }

  &:hover,
  &.active {
    color: ${({ theme }) => theme.navbarActiveColor};
    border-radius: ${BORDER_RADIUS.MD};
    background-color: ${({ theme }) => theme.navbarBackground};
    font-weight: 600;

    svg {
      fill: ${({ theme }) => theme.navbarActiveColor};
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
