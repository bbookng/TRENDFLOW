import * as S from './index.styles';

export interface TextBtnProps {
  children: React.ReactNode;
  onClick: () => void;
}

const TextBtn = ({ children, onClick }: TextBtnProps): React.ReactElement => {
  return <S.TextBtn onClick={onClick}>{children}</S.TextBtn>;
};

export default TextBtn;
