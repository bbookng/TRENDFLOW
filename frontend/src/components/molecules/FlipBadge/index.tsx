import { useState } from 'react';

import * as S from './index.styles';

import CountBadge from '@/components/molecules/CountBadge';
import Badge, { BadgeColorType } from '@/components/atoms/Badge';

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

  const increaseText = color === 'red' ? '증가' : '감소';

  return (
    <S.Div className="flip" width={width}>
      <S.Div className={`card ${flipped ? 'flipped' : ''}`}>
        <S.Div className="front" onClick={flipCard}>
          <CountBadge color={color} width={width}>
            {count}
          </CountBadge>
        </S.Div>
        <S.Div className="back" onClick={flipCard}>
          <Badge color={color} width={width}>
            {/* TODO🍇 Typography 개발되면 Text 수정 */}
            <p>전날에 비해</p>
            <p>
              {changed} {increaseText}
            </p>
          </Badge>
        </S.Div>
      </S.Div>
    </S.Div>
  );
};

export default FilpBadge;
