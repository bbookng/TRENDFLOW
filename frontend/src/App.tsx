import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment } from '@/store/slices/counterSlice';

const App = () => {
  const count = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>{count}</h1>
      <button type="button" onClick={() => dispatch(increment())}>
        +
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
    </>
  );
};

export default App;
