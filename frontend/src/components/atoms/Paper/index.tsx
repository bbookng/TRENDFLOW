import * as S from './index.styles';

export interface PaperPropsInterface {
  children?: React.ReactNode;
}

const Paper = ({ children }: PaperPropsInterface): React.ReactElement => {
  return <S.Paper>{children}</S.Paper>;
};

export default Paper;
