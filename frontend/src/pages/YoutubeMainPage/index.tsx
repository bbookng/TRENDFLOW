import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';
import { ROUTER_PATH } from '@/constants/path';

const YoutubeMainPage = () => {
  const [value, setValue] = useState('');
  const navi = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navi(`/${ROUTER_PATH.YOUTUBE_RESULT_PAGE}`, { state: { link: value } });
  };
  return (
    <S.Wrapper>
      <SearchBar
        placeholder="유튜브 링크를 입력하세요."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </S.Wrapper>
  );
};

export default YoutubeMainPage;
