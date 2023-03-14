import * as S from './index.styles';

export type BadgeColorType = 'red' | 'blue' | 'purple';

export interface BadgePropsInterface {
  children: React.ReactNode;
  width?: string;
  color: BadgeColorType;
}

const Badge = ({ children, width, color }: BadgePropsInterface) => {
  return (
    <S.Badge width={width} color={color}>
      {children}
    </S.Badge>
  );
};

Badge.defaultProps = {
  width: '120px',
};

export default Badge;
