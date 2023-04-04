import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { ROUTER_PATH } from '@/constants/path';
import 'react-tooltip/dist/react-tooltip.css';
import * as S from './index.styles';

interface FormDataInterface {
  keyword1: string;
  keyword2: string;
}

const CompareSearchBar = ({ keywords }: { keywords?: Array<string> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataInterface>();
  const navi = useNavigate();

  const onValid = ({ keyword1, keyword2 }: FormDataInterface) => {
    navi(`/${ROUTER_PATH.COMPARISON_RESULT_PAGE}`, { state: { keyword1, keyword2 } });
  };

  return (
    <S.Form onSubmit={handleSubmit(onValid)}>
      <S.FormInputWrapper>
        <S.FormInput
          {...register('keyword1', {
            required: '첫 번째 키워드를 입력하세요.',
            // 공백 검사
            validate: { noSpace: (v) => !/\s/.test(v) },
          })}
          defaultValue={keywords && keywords[0]}
          placeholder="첫 번째 키워드"
          // 툴팁 설정
          data-tooltip-id="keyword1"
          data-tooltip-content="공백은 입력할 수 없습니다."
          data-tooltip-place="bottom"
        />
        <S.FormInput
          {...register('keyword2', {
            required: '두 번째 키워드를 입력하세요.',
            // 공백 검사
            validate: { noSpace: (v) => !/\s/.test(v) },
          })}
          defaultValue={keywords && keywords[1]}
          placeholder="두 번째 키워드"
          // 툴팁 설정
          data-tooltip-id="keyword2"
          data-tooltip-content="공백은 입력할 수 없습니다."
          data-tooltip-place="bottom"
        />
      </S.FormInputWrapper>
      <S.FormBtn variant="contained" size="MEDIUM" fontSize="LARGE">
        검색
      </S.FormBtn>

      {errors.keyword1?.type === 'noSpace' && <Tooltip id="keyword1" className="tooltip" isOpen />}
      {errors.keyword2?.type === 'noSpace' && <Tooltip id="keyword2" className="tooltip" isOpen />}
    </S.Form>
  );
};

export default CompareSearchBar;
