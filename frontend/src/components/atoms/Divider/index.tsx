import * as S from './index.styles';

export interface DividerPropsInterface {
  type: 'solid' | 'dashed';
  direction: 'horizontal' | 'vertical';
  width: number;
  length: string;
  color?: string;
}

const Divider = (props: DividerPropsInterface) => {
  return <S.Divider {...props} />;
};

export default Divider;
