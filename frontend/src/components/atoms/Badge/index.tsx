import * as S from './index.styles';

export type BadgeColorType = 'red' | 'blue' | 'purple';

export interface BadgePropsInterface {
  children: React.ReactNode;
  width?: string;
  color: BadgeColorType;
}

const Badge = ({ children, width = '120px', color }: BadgePropsInterface) => {
  return (
    <S.Badge width={width} color={color}>
      {children}
    </S.Badge>
  );
};

export default Badge;
