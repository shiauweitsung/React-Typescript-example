import axios from 'axios';
import {
  Fragment,
  useEffect,
  useState,
  useRef,
  createRef,
  useMemo,
} from 'react';
import styles from './styles.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sleep from 'utils/sleep';
import Dropdown from 'components/Dropdown';
import AreaData from './data';

type IData = {
  address: string;
  name: string;
  tel: string;
  nodeRef: HTMLDivElement | null | any;
};

type IResponse = {
  address: string;
  name: string;
  tel: string;
};

type IListItem = {
  item: IData;
};

const ListItem = ({ item }: IListItem) => {
  return (
    <Fragment>
      <div className={styles.card} ref={item.nodeRef}>
        <a
          href={`https://www.google.com.tw/maps/search/${item.address}`}
          target="_blank"
          rel="noreferrer"
          className={styles.card_item}
        >
          <p>醫院：{item.name}</p>
          <p>地址：{item.address}</p>
          <p>電話：{item.tel}</p>
        </a>
      </div>
    </Fragment>
  );
};

export default function AnimalHospital() {
  const [data, setData] = useState<IData[]>([]);
  const [all, setAll] = useState<IData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(20);
  const [selectedArea, setSelArea] = useState<string>('');

  const filterData = useMemo(() => {
    if (selectedArea != '') {
      return all.filter((item) => {
        const [area] = item.address.split('區');
        return area === selectedArea;
      });
    } else {
      return null;
    }
  }, [selectedArea, all]);

  const fetchData = async () => {
    console.log(offset, 'offset');
    if (offset >= 246) {
      setHasMore(false);
    }
    await sleep(2000);
    const result = await axios
      .get(
        `https://data.ntpc.gov.tw/api/datasets/de4cfd62-e977-4c4f-822f-7d2aa65f6e4a/json?size=${offset}`
      )
      .then((res) => {
        const arr = res.data.map((item: IResponse) => ({
          ...item,
          nodeRef: createRef(),
        }));
        setData(arr);
        setOffset((prev) => prev + 20);
      });
  };

  useEffect(() => {
    fetchData();
    (async () => {
      const arr = await (
        await axios.get(
          'https://data.ntpc.gov.tw/api/datasets/de4cfd62-e977-4c4f-822f-7d2aa65f6e4a/json?size=300'
        )
      ).data;
      setAll(arr);
    })();
  }, []);

  return (
    <div className={styles.wrap}>
      <Dropdown
        onChange={(value) => {
          console.log('change', value);
          setSelArea(value);
        }}
        option={AreaData}
        value={selectedArea}
      />
      <button
        onClick={() => {
          setSelArea('');
        }}
      >
        clear
      </button>
      {filterData ? (
        <TransitionGroup className={styles.container}>
          {filterData.map((item: IData) => {
            return (
              <CSSTransition
                key={item.tel}
                nodeRef={item.nodeRef}
                timeout={500}
                classNames="alert"
              >
                <ListItem item={item} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      ) : (
        <InfiniteScroll
          className={styles.root}
          next={fetchData}
          hasMore={hasMore}
          loader={<div className={styles.loading}>loading</div>}
          dataLength={data.length}
          endMessage={<div className={styles.end}>No More...</div>}
        >
          <TransitionGroup className={styles.container}>
            {data.map((item: IData) => {
              return (
                <CSSTransition
                  key={item.tel}
                  nodeRef={item.nodeRef}
                  timeout={500}
                  classNames="alert"
                >
                  <ListItem item={item} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </InfiniteScroll>
      )}
    </div>
  );
}
