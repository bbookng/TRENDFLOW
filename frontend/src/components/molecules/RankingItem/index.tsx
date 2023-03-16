import { useNavigate } from 'react-router-dom';
import Typography from '@/components/atoms/Typography';
import * as S from './index.styles';

export type RankChangeType = 'up' | 'down' | 'new' | 'same';

export interface RankingItemPropsInterface {
  type: RankChangeType;
  rank: string;
  keyword: string;
  step?: string;
  width: string;
  margin: string;
}

/**
 * @param {RankChangeType} type 변화 유형
 * @param {string} rank 순위
 * @param {string} keyword 키워드
 * @param {string} step 변화 순위 (up 또는 down인 경우에만 입력)
 * @param {string} width 가로 길이
 * @param {string} margin '상 우 하 좌' 형식
 */
const RankingItem = ({ type, rank, keyword, step, width, margin }: RankingItemPropsInterface) => {
  const navi = useNavigate();

  return (
    <S.Wrapper
      width={width}
      margin={margin}
      onClick={() => navi('/social/result', { state: { keyword } })}
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
