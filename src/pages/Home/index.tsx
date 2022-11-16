import { useMemo, useState } from 'react';
import Button from 'components/Button';
import { useEffect } from 'react';

export function Home() {
  const [count, setCount] = useState<number>(0);
  const memo = useMemo(() => {
    console.log(count, 'count');

    return count > 5 ? '5' : '----';
  }, [count]);
  console.log('render');

  return (
    <div>
      <h1>Home</h1>
      <p>{memo}</p>
      <Button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        increament
      </Button>
      <Button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        decreament
      </Button>
    </div>
  );
}

export default Home;
