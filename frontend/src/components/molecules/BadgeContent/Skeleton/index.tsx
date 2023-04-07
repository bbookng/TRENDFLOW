import * as S from './index.styles';
import { Label } from '@/components/atoms';

type BadgeContentType = 'grape' | 'mention';

interface BadgeContentPropsInterface {
  type: BadgeContentType;
}

const BadgeContentSkeleton = ({ type }: BadgeContentPropsInterface) => {
  return (
    <S.Wrapper>
      <Label>{type === 'grape' ? '포도알 지수' : '언급량'}</Label>
      <S.BadgePaper>
        <S.Badge></S.Badge>
      </S.BadgePaper>
    </S.Wrapper>
  );
};

export default BadgeContentSkeleton;
