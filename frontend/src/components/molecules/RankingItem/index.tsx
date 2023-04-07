import { useNavigate } from 'react-router-dom';
import Typography from '@/components/atoms/Typography';
import { ROUTER_PATH } from '@/constants/path';
import * as S from './index.styles';

export type RankChangeType = 'up' | 'down' | 'new' | 'same';

export interface RankingItemPropsInterface {
  rank: number;
  keyword: string;
  type: RankChangeType;
  step?: number;
  width: string;
}

/**
 * @param {number} rank 순위
 * @param {string} keyword 키워드
 * @param {RankChangeType} type 변화 유형
 * @param {number} step 변화 순위 (up 또는 down인 경우에만 입력)
 * @param {string} width 가로 길이 (단위 포함)
 */
const RankingItem = ({ rank, keyword, type, step, width }: RankingItemPropsInterface) => {
  const navi = useNavigate();

  return (
    <S.Wrapper
      width={width}
      onClick={() => navi(`/${ROUTER_PATH.SOCIAL_RESULT_PAGE}`, { state: { keyword } })}
    >
      <S.RankKeywordWrapper>
        {/* 순위 */}
        <S.Rank variant="BASE" weight="700">
          {rank}
        </S.Rank>
        {/* 키워드 */}
        <Typography variant="BASE">{keyword}</Typography>
      </S.RankKeywordWrapper>

      {/* 증감 */}
      <S.StepWrapper>
        {(type === 'up' || type === 'down') && <S.Triangle type={type} />}
        <S.ChangedStep variant="SMALL" type={type}>
          {(type === 'up' || type === 'down') && step}
          {type === 'new' && 'NEW'}
          {type === 'same' && '-'}
        </S.ChangedStep>
      </S.StepWrapper>
    </S.Wrapper>
  );
};

export default RankingItem;
