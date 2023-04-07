import * as S from './index.styles';

interface Props {
  size: number;
  children: React.ReactNode;
}

const Svg = ({ size, children }: Props): React.ReactElement => {
  return <S.Wrapper size={size}>{children}</S.Wrapper>;
};

export default Svg;
