import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCount } from 'store/counterSlice';
import { useSelector } from 'react-redux';
import { increment, decrement, fetchPokemo } from 'store/counterSlice';
import styles from './styles.module.scss';
import Button from 'components/Button';

export function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  // const a = useSelector(selectCount);

  useEffect(() => {
    (async () => {
      const pokemoData = await dispatch(fetchPokemo());
      //   console.log(pokemoData, 'pokemoData');
    })();
  }, []);

  return (
    <div className={styles.root}>
      <h1>Counter page</h1>
      <h2>{count}</h2>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            dispatch(increment());
          }}
        >
          increment
        </Button>
        <Button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          decrement
        </Button>
      </div>
    </div>
  );
}

export default Counter;
