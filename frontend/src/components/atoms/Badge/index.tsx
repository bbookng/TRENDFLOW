import * as S from './index.styles';

export type BadgeType = 'up' | 'down' | 'same';

export interface BadgePropsInterface {
  children: React.ReactNode;
  width?: string;
  type: BadgeType;
}

const Badge = ({ children, width = '120px', type }: BadgePropsInterface) => {
  return (
    <S.Badge width={width} type={type}>
      {children}
    </S.Badge>
  );
};

export default Badge;
