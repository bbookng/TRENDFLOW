import { Global } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment } from '@/store/slices/counterSlice';
import { globalStyles } from '@/styles/globalStyles';
import Button from '@/components/common/Button';

const App = () => {
  const count = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <Global styles={globalStyles} />
      <h1>{count}</h1>
      <button type="button" onClick={() => dispatch(increment())}>
        +
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
      <Button />
    </>
  );
};

export default App;
