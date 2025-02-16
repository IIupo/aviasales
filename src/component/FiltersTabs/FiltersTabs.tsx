import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveFilterTab,
  sortByPrice,
  sortByDuration,
  sortByOptimal,
} from '../../store/TicketSlice';
import { TicketsState, FILTER_ID, FILTER_TABS_LABELS } from '../../types/types';
import styles from './FiltersTabs.module.css';

export const FilterTabs: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilterTab = useSelector((state: { tickets: TicketsState }) => state.tickets.activeFilterTab);

  const handleFilterChange = (filterType: FILTER_ID) => {
    dispatch(setActiveFilterTab(filterType));

    switch (filterType) {
      case FILTER_ID.CHEAPER:
        dispatch(sortByPrice());
        break;
      case FILTER_ID.FASTER:
        dispatch(sortByDuration());
        break;
      case FILTER_ID.OPTIMAL:
        dispatch(sortByOptimal());
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.filterButtons}>
      {Object.values(FILTER_ID).map((id) => (id !== 'ALL') ? (
        <button
          key={id}
          onClick={() => handleFilterChange(id)}
          className={activeFilterTab === id ? styles.active : styles.button}
        >
          {FILTER_TABS_LABELS[id].toUpperCase()}
        </button>
      ):null)}
    </div>
  );
};