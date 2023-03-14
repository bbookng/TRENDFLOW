import React from 'react';
import * as S from './index.styles';

export interface Props {
  inputName: string;
  placeholder?: string;
  value?: string;
  // onChange Handler(setState)
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onFocusOut Handler
  onFocusOut?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({ inputName, ...props }: Props): React.ReactElement => {
  return <S.Input name={inputName} {...props} autoComplete="off" />;
};

export default Input;
