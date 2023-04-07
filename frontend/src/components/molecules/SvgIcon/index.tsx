import * as S from './index.styles';

export interface SvgIconProps {
  size: number;
  children: React.ReactNode;
}

const SvgIcon = ({ size, children }: SvgIconProps): React.ReactElement => {
  return <S.Wrapper size={size}>{children}</S.Wrapper>;
};

export default SvgIcon;
