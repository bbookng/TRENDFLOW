//   const CustomDataPicker = forwardRef({ value, onClick }: CustomInputInterface,ref) => (
//     <S.CustomDataPicker onClick={onClick} ref={ref}>{value}</S.CustomDataPicker>
//   );

import { forwardRef } from 'react';
import * as S from './intdex.styles';

interface CustomInputInterface {
  value?: string;
  onClick?: () => void;
}
// eslint-disable-next-line react/display-name
const CustomDatePicker = forwardRef<HTMLButtonElement, CustomInputInterface>(
  ({ value, onClick }, ref) => {
    return (
      <S.CustomDataPicker onClick={onClick} ref={ref}>
        {value}
      </S.CustomDataPicker>
    );
  }
);
export default CustomDatePicker;
