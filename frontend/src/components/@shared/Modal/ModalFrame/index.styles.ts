import styled from '@emotion/styled';
import { BORDER_RADIUS } from '@/constants/styles';

export const Dim = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface ModalContainerProps {
  width: string;
  height: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: 1rem;
  background: ${({ theme }) => theme.contentBackground};
  border-radius: ${BORDER_RADIUS.XL};
`;
