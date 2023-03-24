import * as S from './index.styles';

export interface DividerPropsInterface {
  type: 'solid' | 'dashed';
  direction: 'horizontal' | 'vertical';
  width: number;
  length: string;
  color?: string;
}
/**
 *
 * @param  type require
 * @param direction require
 * @param width require
 * @param length require
 * @param color
 */
const Divider = (props: DividerPropsInterface) => {
  return <S.Divider {...props} />;
};

export default Divider;
