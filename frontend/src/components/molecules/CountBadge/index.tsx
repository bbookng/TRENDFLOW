import * as S from './index.styles';

import Badge, { BadgePropsInterface } from '@/components/atoms/Badge';

const CountBadge = ({ children, width, color }: BadgePropsInterface) => {
  return (
    <Badge width={width} color={color}>
      <S.CountText color={color}>{children}</S.CountText>
    </Badge>
  );
};

export default CountBadge;
