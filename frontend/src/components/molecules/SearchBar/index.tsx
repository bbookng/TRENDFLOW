import { useState } from 'react';
import * as S from './index.styles';

const SearchBar = (): React.ReactElement => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit}>
        <S.FormInput
          inputName="search-input"
          placeholder="키워드를 입력해주세요."
          onChange={handleChange}
          value={value}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.62866 15.2559C3.42359 15.2559 0 11.8326 0 7.62794C0 3.42327 3.42359 0 7.62866 0C11.8337 0 15.2573 3.42327 15.2573 7.62794C15.2573 11.8326 11.8337 15.2559 7.62866 15.2559ZM7.62866 1.11628C4.03389 1.11628 1.11639 4.04095 1.11639 7.62794C1.11639 11.2149 4.03389 14.1396 7.62866 14.1396C11.2234 14.1396 14.1409 11.2149 14.1409 7.62794C14.1409 4.04095 11.2234 1.11628 7.62866 1.11628Z"
            fill="#A86FE1"
          />
          <path
            d="M15.4438 16C15.3024 16 15.161 15.9479 15.0493 15.8362L13.5608 14.3479C13.345 14.132 13.345 13.7748 13.5608 13.559C13.7766 13.3432 14.1339 13.3432 14.3497 13.559L15.8382 15.0474C16.0541 15.2632 16.0541 15.6204 15.8382 15.8362C15.7266 15.9479 15.5852 16 15.4438 16Z"
            fill="#A86FE1"
          />
        </svg>
      </S.Form>
    </S.Wrapper>
  );
};

export default SearchBar;
