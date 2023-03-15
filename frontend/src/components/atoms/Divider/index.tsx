import { ThemeId } from '@/styles/emotion';
import * as S from './index.styles';

export interface DividerPropsInterface {
  themeId: ThemeId;
  type: 'solid' | 'dashed';
  direction: 'horizontal' | 'vertical';
  width: number;
}

const Divider = (props: DividerPropsInterface) => {
  return <S.Divider {...props} />;
};

export default Divider;
