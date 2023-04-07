import styled from '@emotion/styled';

import { DividerPropsInterface } from '@/components/atoms/Divider';

export const Divider = styled.hr<DividerPropsInterface>`
  border-top: ${({ direction, width, type, color, theme }) =>
    direction === 'horizontal' && `${width}px ${type} ${color || theme.border}`};
  border-left: ${({ direction, width, type, color, theme }) =>
    direction === 'vertical' && `${width}px ${type}  ${color || theme.border} `};
  width: ${({ direction, length }) => (direction === 'horizontal' ? `${length}` : '0')};
  height: ${({ direction, length }) => (direction === 'vertical' ? `${length}` : '0')};

  /* 공통 css */
  overflow: hidden;
`;
