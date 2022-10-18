import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCount } from 'store/counterSlice';
import { useSelector } from 'react-redux';

export function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter);
  const a = useSelector(selectCount);
  console.log(a, 'a');

  console.log(count, 'count');

  return (
    <div>
      <h1>Counter page</h1>
    </div>
  );
}

export default Counter;
