import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilterTab, sortByPrice, sortByDuration, sortByOptimal } from '../../store/TicketSlice';
import { FILTER_ID, FilterId } from '../../types/types';
import { TicketsState } from '../../store/types';
import styles from './FiltersTabs.module.css';

interface FilterButton {
  filter: FilterId;
  name: string;
}

const filterButtons: FilterButton[] = [
  { filter: FILTER_ID.CHEAPER, name: 'Дешевле' },
  { filter: FILTER_ID.FASTER, name: 'Быстрее' },
  { filter: FILTER_ID.OPTIMAL, name: 'Оптимальные' },
];

export const FilterTabs: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilterTab = useSelector((state: { tickets: TicketsState }) => state.tickets.activeFilterTab);

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
        break;
    }
  };

  return (
    <div className={styles.filterButtons}>
      {filterButtons.map(({ filter, name }) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={activeFilterTab === filter ? styles.active : styles.button}
        >
          {name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};