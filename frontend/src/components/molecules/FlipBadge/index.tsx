import { useState } from 'react';

import * as S from './index.styles';

import { PALETTE } from '@/constants/palette';

import CountBadge from '@/components/molecules/CountBadge';
import Badge, { BadgeColorType } from '@/components/atoms/Badge';
import Typography from '@/components/atoms/Typography';

export interface FlipBadgePropsInterface {
  count: string;
  changed: string;
  width: string;
  color: BadgeColorType;
}

/**
 * @param {string} count 포도알 지수 또는 언급량 (단위까지)
 * @param {string} changed 전일 대비 변화량 (단위까지)
 * @param {string} width 가로, 세로의 길이
 * @param {BadgeColorType} color 뱃지 색 (red, blue, purple 중 택)
 */
const FilpBadge = ({ count, changed, width, color }: FlipBadgePropsInterface) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped((prev) => !prev);
  };

  const isNeutral = color === 'purple';
  const increaseText = color === 'red' ? '증가' : '감소';

  return (
    <S.Div className="flip" width={width}>
      <S.Div className={`card ${flipped ? 'flipped' : ''}`}>
        {/* 카드 앞면 */}
        <S.Div className="front" onClick={flipCard}>
          <CountBadge color={color} width={width}>
            {count}
          </CountBadge>
        </S.Div>
        {/* 카드 뒷면 */}
        <S.Div className="back" onClick={flipCard}>
          <Badge color={color} width={width}>
            {/* TODO🍇 Typography 개발되면 Text 수정 */}
            {/* 뱃지 텍스트 */}
            {isNeutral && <p>전날과 동일</p>}
            {isNeutral || (
              <>
                <Typography color={PALETTE.BLACK200} variant="BASE" weight="500">
                  전날에 비해
                </Typography>
                <Typography color={color} variant="BASE" weight="500">
                  {changed} {increaseText}
                </Typography>
              </>
            )}
          </Badge>
        </S.Div>
      </S.Div>
    </S.Div>
  );
};

export default FilpBadge;
