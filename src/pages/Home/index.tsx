import { useMemo, useState } from 'react';
import Button from 'components/Button';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { increment, decrement } from 'store/counterSlice';
import { useAppDispatch } from 'store/hook';
import ReactDatePicker from 'react-datepicker';

export function Home() {
  const [count, setCount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const inputRef = useRef(null);
  const [startDate, endDate] = dateRange;
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
      <ReactDatePicker
        selectsRange={true}
        // selected={startDate}
        startDate={startDate}
        endDate={endDate}
        placeholderText="Date range"
        onChange={(update) => {
          console.log(update, 'update');
          setDateRange(update);
        }}
        customInput={
          <>
            <input type="text" ref={inputRef} />
          </>
        }
      />
    </div>
  );
}

export default Home;
