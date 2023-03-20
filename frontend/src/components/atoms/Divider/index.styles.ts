import styled from '@emotion/styled';

import { DividerPropsInterface } from '@/components/atoms/Divider';

export const Divider = styled.hr<DividerPropsInterface>`
  border-top: ${({ direction, width, type }) => direction === 'horizontal' && `${width}px ${type}`};
  border-left: ${({ direction, width, type }) => direction === 'vertical' && `${width}px ${type}`};
  width: ${({ direction, length }) => (direction === 'horizontal' ? `${length}` : '0')};
  height: ${({ direction, length }) => (direction === 'vertical' ? `${length}` : '0')};

  /* 공통 css */
  overflow: hidden;
  border-color: ${({ theme, color }) => color || theme.border};
`;
