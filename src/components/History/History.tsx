import React, { useEffect, useState } from 'react';

import { IFlightsHistoryData, getHistoryData } from '../utils';
import FlightsCard from './HistoryCards/FlightsCard';
import HotelsCard from './HistoryCards/HotelsCard';
import CarsCard from './HistoryCards/CarsCard';
import styles from './History.module.scss';

export default function History() {
  const [historyList, setHistoryList] = useState<IFlightsHistoryData[]>([]);
  useEffect(() => {
    const getData: any = getHistoryData();
    if (getData == null) setHistoryList(getData);
    setHistoryList(getData);
  }, []);

  const historyListRender: JSX.Element[] = historyList.map((historyItem: any) => {
    if (historyItem.type === 'Flights') {
      return <FlightsCard key={historyItem.id} data={historyItem} />;
    }
    if (historyItem.type === 'Hotels') {
      return <HotelsCard key={historyItem.id} data={historyItem} />;
    }
    if (historyItem.type === 'Cars') {
      return <CarsCard key={historyItem.id} data={historyItem} />;
    }
    return <div key={99}>History</div>;
  });

  return (
    <div className={styles.HistoryWrapper}>
      <h3>Search History</h3>
      <div className={styles.History}>
        <div className={styles.HistoryList}>{historyListRender}</div>
      </div>
    </div>
  );
}
