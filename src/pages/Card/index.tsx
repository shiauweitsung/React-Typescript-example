import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';

export function makeTag(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function randomLength() {
  return Math.random() * 10 + 1;
}

type IData = {
  tags: {
    tag: string;
    tagWidth: number;
  }[];
}[];

const data = Array.from(Array(10)).map(() => {
  const tags = Array.from(Array(10)).map(() => {
    const length = randomLength();
    const tag = makeTag(length);
    const tagElement = document.createElement('span');
    tagElement.textContent = tag;
    tagElement.style.cssText = styles.tag;
    document.body.appendChild(tagElement);
    const tagWidth = tagElement.offsetWidth;
    document.body.removeChild(tagElement);
    return {
      tag,
      tagWidth,
    };
  });
  return {
    tags,
  };
}) as IData;

type INewData = {
  expandTags: boolean;
  showExpandTags: boolean;
  maxVisibleTags: number;
  tags: {
    tag: string;
    tagWidth: number;
    maxWidth: number;
  }[];
}[];

export default function Card() {
  const [hiddenTags, setHiddenTags] = useState<boolean>(false);
  const [cardData, setCardData] = useState<INewData | []>([]);
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const newData = useMemo(() => {
    if (!data) return [];
    return data.map((item) => {
      let maxVisibleTags = 0;
      let currentWidth = 0;
      let maxWidth = 0;
      const tags = item.tags.map((tag) => {
        if (
          maxVisibleTags < item.tags.length &&
          currentWidth + tag.tagWidth <= 240 - 60
        ) {
          currentWidth += tag.tagWidth;
          maxVisibleTags++;
        }
        maxWidth += tag.tagWidth;
        return {
          ...tag,
          maxWidth,
        };
      });
      return {
        tags,
        maxVisibleTags,
        showExpandTags: false,
        expandTags: item.tags.length > maxVisibleTags ? true : false,
      };
    });
  }, [data]);

  const toggleExpandTags = (index: number) => {
    const newDataCopy = [...newData];
    console.log('newDataCopy', newDataCopy);
    console.log('newData', newData);
    newDataCopy[index].showExpandTags = !newDataCopy[index].showExpandTags;
    forceUpdate();
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {newData
          ? newData.map((card, index) => {
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.tags} id="tags">
                    {card.tags
                      .slice(0, card.maxVisibleTags)
                      .map((tag, tagIndex) => (
                        <Fragment key={tagIndex}>
                          <div className={styles.tag}>{tag.tag}</div>
                        </Fragment>
                      ))}
                    {card.expandTags && (
                      <div
                        className={styles.expand}
                        onClick={() => {
                          //   setHiddenTags(!hiddenTags);
                          //   card.showExpandTags = !card.showExpandTags;
                          //   console.log('newData', newData);
                          toggleExpandTags(index);
                        }}
                      >
                        ...
                      </div>
                    )}
                    {card.showExpandTags &&
                      card.tags
                        .slice(card.maxVisibleTags + 1, card.tags.length)
                        .map((tag, tagIndex) => (
                          <Fragment key={tagIndex}>
                            <div className={styles.tag}>{tag.tag}</div>
                          </Fragment>
                        ))}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
