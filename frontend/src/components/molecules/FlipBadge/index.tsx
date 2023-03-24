import { useState } from 'react';
import { PALETTE } from '@/constants/palette';
import CountBadge from '@/components/molecules/CountBadge';
import Badge, { BadgeType } from '@/components/atoms/Badge';
import Typography from '@/components/atoms/Typography';
import * as S from './index.styles';

export interface FlipBadgePropsInterface {
  count: string;
  changed: string;
  width: string;
  type: BadgeType;
}

/**
 * @param {string} count 포도알 지수 또는 언급량 (단위 포함)
 * @param {string} changed 전일 대비 변화량 (단위 포함)
 * @param {string} width 가로, 세로의 길이 (단위 포함)
 * @param {BadgeType} type 뱃지 타입 (up, down, same)
 */
const FlipBadge = ({ count, changed, width, type }: FlipBadgePropsInterface) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped((prev) => !prev);
  };

  const isNeutral = type === 'same';
  const increaseText = type === 'up' ? '증가' : '감소';

  return (
    <S.Div className="flip" width={width}>
      <S.Div className={`card ${flipped ? 'flipped' : ''}`}>
        {/* 카드 앞면 */}
        <S.Div className="front" onClick={flipCard}>
          <CountBadge type={type} width={width}>
            {count}
          </CountBadge>
        </S.Div>

        {/* 카드 뒷면 */}
        <S.Div className="back" onClick={flipCard}>
          <Badge type={type} width={width}>
            {/* 뱃지 텍스트 */}
            {isNeutral && (
              <Typography variant="BASE" weight="500">
                전날과 동일
              </Typography>
            )}
            {isNeutral || (
              <>
                <Typography color={PALETTE.BLACK200} variant="BASE" weight="500">
                  전날에 비해
                </Typography>
                <S.ChangedText type={type} variant="BASE" weight="500">
                  {changed} {increaseText}
                </S.ChangedText>
              </>
            )}
          </Badge>
        </S.Div>
      </S.Div>
    </S.Div>
  );
};

export default FlipBadge;
