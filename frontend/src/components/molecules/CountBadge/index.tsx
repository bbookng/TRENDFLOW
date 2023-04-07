import Badge, { BadgePropsInterface } from '@/components/atoms/Badge';
import * as S from './index.styles';

const CountBadge = ({ children, width, type }: BadgePropsInterface) => {
  return (
    <Badge width={width} type={type}>
      <S.CountText variant="H2" type={type} weight="700">
        {children}
      </S.CountText>
    </Badge>
  );
};

export default CountBadge;
