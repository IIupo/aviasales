import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../../store/TicketSlice';
import styles from './Checkboxes.module.css';
import { TicketsState, CHECKBOX_ID, CHECKBOX_LABELS } from '../../types/types';

export const Checkboxes: React.FC = () => {
  const activeCheckboxes = useSelector((state: { tickets: TicketsState }) => state.tickets.activeCheckboxes);
  const dispatch = useDispatch();

  const handleToggle = (id: CHECKBOX_ID) => {
    dispatch(toggleFilter(id));
  };

  return (
    <div className={styles.board}>
      <span className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {Object.values(CHECKBOX_ID).map((id) => (
        <label key={id}>
          <input
            type="checkbox"
            checked={activeCheckboxes.includes(id)}
            onChange={() => handleToggle(id)}
          />
          {CHECKBOX_LABELS[id]}
        </label>
      ))}
    </div>
  );
};