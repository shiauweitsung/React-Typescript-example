import { useMemo, useState } from 'react';
import Button from 'components/Button';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { increment, decrement } from 'store/counterSlice';
import { useAppDispatch } from 'store/hook';

export function Home() {
  const [count, setCount] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const memo = useMemo(() => {
    console.log(count, 'count');

    return count > 5 ? '5' : '----';
  }, [count]);
  console.log('render');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>Home</h1>
      <p>{memo}</p>
      <Button
        onClick={() => {
          setCount((prev) => prev + 1);
          dispatch(increment());
        }}
      >
        increament
      </Button>
      <Button
        onClick={() => {
          setCount((prev) => prev - 1);
          dispatch(decrement());
        }}
      >
        decreament
      </Button>
      <h2>i18n 語系</h2>
      <h2>{t('Welcome to React')}</h2>
      <Button
        onClick={() => {
          changeLanguage('en');
        }}
      >
        切換英文
      </Button>
      <Button
        onClick={() => {
          changeLanguage('tw');
        }}
      >
        切換中文
      </Button>
    </div>
  );
}

export default Home;
