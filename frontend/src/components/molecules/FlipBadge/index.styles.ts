import styled from '@emotion/styled';

import { FlipBadgePropsInterface } from '@/components/molecules/FlipBadge';

interface FlipDivPropsInterface extends FlipBadgePropsInterface {
  onClick?: () => void;
}

export const Div = styled.div<Partial<FlipDivPropsInterface>>`
  &.flip {
    position: relative;
    width: ${({ width }) => width};
    height: ${({ width }) => width};
  }

  &.card {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.4s ease;
    transform-style: preserve-3d;

    &.flipped {
      transform: rotateY(180deg);
    }
  }

  &.front,
  &.back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  &.front {
  }

  &.back {
    transform: rotateY(180deg);
  }
`;
