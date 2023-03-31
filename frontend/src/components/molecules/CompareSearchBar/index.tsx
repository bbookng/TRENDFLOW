import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as S from './index.styles';
import { ROUTER_PATH } from '@/constants/path';

interface FormDataInterface {
  keyword1: string;
  keyword2: string;
}

const CompareSearchBar = ({ keywords }: { keywords?: Array<string> }) => {
  const { register, handleSubmit } = useForm<FormDataInterface>();
  const navi = useNavigate();

  const onValid = ({ keyword1, keyword2 }: FormDataInterface) => {
    navi(`/${ROUTER_PATH.COMPARISON_RESULT_PAGE}`, { state: { keyword1, keyword2 } });
  };

  return (
    <S.Form onSubmit={handleSubmit(onValid)}>
      <S.FormInputWrapper>
        <S.FormInput
          {...register('keyword1', { required: '첫 번째 키워드를 입력하세요.' })}
          defaultValue={keywords && keywords[0]}
          placeholder="첫 번째 키워드"
        />
        <S.FormInput
          {...register('keyword2', { required: '두 번째 키워드를 입력하세요.' })}
          defaultValue={keywords && keywords[1]}
          placeholder="두 번째 키워드"
        />
      </S.FormInputWrapper>
      <S.FormBtn variant="contained" size="MEDIUM" fontSize="LARGE">
        검색
      </S.FormBtn>
    </S.Form>
  );
};

export default CompareSearchBar;
