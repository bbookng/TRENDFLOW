import * as S from './index.styles';

const Label = ({ children }: { children: React.ReactNode }) => {
  return <S.Label variant="H4">{children}</S.Label>;
};

export default Label;
