import { useMemo, useState } from 'react';
import Button from 'components/Button';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { increment, decrement } from 'store/counterSlice';
import { useAppDispatch } from 'store/hook';
import ReactDatePicker from 'react-datepicker';
import sleep from '../../utils/sleep';
import axios from 'axios';

export function Home() {
  const [count, setCount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const inputRef = useRef(null);
  const [startDate, endDate] = dateRange;
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);
  const memo = useMemo(() => {
    console.log(count, 'count');

    return count > 5 ? '5' : '----';
  }, [count]);
  console.log('render');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const callbackTest = async () => {
    console.log('call backTest');
    const data = await axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => {
        console.log('call back', res);
      });
    await sleep(3000);
    console.log('call backTest2');
  };

  const Test = async (callback: () => void) => {
    // await sleep(1000);
    const data = await axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => {
        console.log('res1', res);
      });
    console.log('test');
    callback();
  };

  function fetchUserData(
    userId: number
  ): Promise<{ name: string; age: number }> {
    return new Promise<{ name: string; age: number }>((resolve, reject) => {
      setTimeout(() => {
        if (userId === 1) {
          resolve({ name: 'John', age: 30 });
        } else if (userId === 2) {
          resolve({ name: 'Jane', age: 25 });
        } else {
          reject(new Error('User not found'));
        }
      }, 3000);
    });
  }

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
      <Button
        onClick={async () => {
          // printNumber(10, printMessage);
          Test(callbackTest);
          const promise1 = await fetchUserData(1);
          const promise2 = await fetchUserData(2);

          Promise.all([promise1, promise2])
            .then((results) => {
              console.log(results); // [{ name: "John", age: 30 }, { name: "Jane", age: 25 }]
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        call back test
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
