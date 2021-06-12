import React, { useEffect, useState } from 'react';

import { getHistoryData } from '../utils';
import FlightsCard from './HistoryCards/FlightsCard';
import HotelsCard from './HistoryCards/HotelsCard';
import CarsCard from './HistoryCards/CarsCard';
import styles from './History.module.scss';

export default function History() {
  const [historyList, setHistoryList] = useState<any>([]);
  useEffect(() => {
    const getData: any = getHistoryData();
    if (getData === null) setHistoryList([]);
    setHistoryList(getData);
  }, []);

  const removeHistoryItem = (id: string) => {
    const updatedHistoryList = historyList.filter((item: any) => item.id !== id);
    setHistoryList(updatedHistoryList);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistoryList));
  };

  const historyListRender = (historyItem: any) => {
    if (historyItem.type === 'Flights') {
      return (
        <FlightsCard
          key={historyItem.id}
          id={historyItem.id}
          data={historyItem}
          removeHistoryItem={removeHistoryItem}
        />
      );
    }
    if (historyItem.type === 'Hotels') {
      return (
        <HotelsCard
          key={historyItem.id}
          id={historyItem.id}
          data={historyItem}
          removeHistoryItem={removeHistoryItem}
        />
      );
    }
    return (
      <CarsCard
        key={historyItem.id}
        id={historyItem.id}
        data={historyItem}
        removeHistoryItem={removeHistoryItem}
      />
    );
  };

  return (
    <div className={styles.HistoryWrapper}>
      <h3>Search History</h3>
      <div className={styles.History}>
        <div className={styles.HistoryList}>
          {historyList && historyList.length ? (
            historyList.map((historyItem: { type: string }) => historyListRender(historyItem))
          ) : (
            <div>History is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}
