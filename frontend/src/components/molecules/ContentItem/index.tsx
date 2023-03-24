import * as S from './index.styles';

export interface ContentItemPropsInterface {
  children: React.ReactNode;
}

const ContentItem = ({ children }: ContentItemPropsInterface): React.ReactElement => {
  return <S.ContentItemPaper>{children}</S.ContentItemPaper>;
};

export default ContentItem;
