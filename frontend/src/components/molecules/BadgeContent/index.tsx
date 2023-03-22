import { Label } from '@/components/atoms';
import FlipBadge, { FlipBadgePropsInterface } from '@/components/molecules/FlipBadge';
import * as S from './index.styles';

type BadgeContentType = 'grape' | 'mention';

interface BadgeContentPropsInterface {
  type: BadgeContentType;
  badge: FlipBadgePropsInterface;
}

const BadgeContent = ({ type, badge }: BadgeContentPropsInterface) => {
  return (
    <S.Wrapper>
      <Label>{type === 'grape' ? '포도알 지수' : '언급량'}</Label>
      <S.BadgePaper>
        <FlipBadge {...badge} />
      </S.BadgePaper>
    </S.Wrapper>
  );
};

export default BadgeContent;
