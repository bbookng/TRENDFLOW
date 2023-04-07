import styled from '@emotion/styled';
import { BORDER_RADIUS, FONT_SIZE } from '@/constants/styles';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';

export const ButtonSkeleton = styled(Skeleton)<{ size: 'SMALL' | 'LARGE' }>`
  min-width: ${({ size }) => (size === 'SMALL' ? '71px' : '360px')};
  padding: 0.5rem 1rem;
  border-radius: ${BORDER_RADIUS.SM};
  color: transparent;
  font-size: ${({ size }) => FONT_SIZE[size]};
`;
