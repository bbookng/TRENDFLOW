import * as S from './index.styles';

const Label = ({ children, color }: { children: React.ReactNode; color?: string }) => {
  return (
    <S.Label variant="H4" color={color}>
      {children}
    </S.Label>
  );
};

export default Label;
