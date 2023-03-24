import styled from '@emotion/styled';
import { BORDER_RADIUS } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

export const Logo = styled.div`
  margin-top: 2rem;
  & > svg {
    width: 210px;
    height: 40px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled.button`
  width: 240px;
  display: flex;
  align-items: center;
  gap: 19px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.SM};
  padding: 10px 16px;
`;

export const Footer = styled.div`
  & > p {
    color: ${({ theme }) => theme.text200};
  }
`;
