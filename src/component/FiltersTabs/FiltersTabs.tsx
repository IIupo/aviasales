import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setActiveFilterTab, 
  sortByPrice,
  sortByDuration,
  sortByOptimal,
} from '../../store/TicketSlice';
import { TicketsState, FiltersTabs, FilterId, FILTER_ID } from '../../types/types';
import styles from './FiltersTabs.module.css';

export const FilterTabs: React.FC = () => {
  const dispatch = useDispatch();
  const filterTabs = useSelector((state: { tickets: TicketsState }) => state.tickets.filterTabs);

  const handleFilterChange = (filterType: FilterId) => {
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
        dispatch(sortByPrice());
        break;
    }
  };

  return (
    <div className={styles.filterButtons}>
      {filterTabs.map((button: FiltersTabs) => (
        <button
          key={button.id}
          onClick={() => handleFilterChange(button.id)}
          className={button.active ? styles.active : styles.button}
        >
          {button.text.toUpperCase()}
        </button>
      ))}
    </div>
  );
};