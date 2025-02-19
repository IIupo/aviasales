import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../../store/TicketSlice';
import styles from './Checkboxes.module.css';
import { CHECKBOX_ID, CheckboxId } from '../../types/types';
import { TicketsState } from '../../store/types';

interface CheckboxButton {
  filter: CheckboxId;
  name: string;
}

const checkboxButtons: CheckboxButton[] = [
  { filter: CHECKBOX_ID.ALL, name: 'Все' },
  { filter: CHECKBOX_ID.NO_STOPS, name: 'Без пересадок' },
  { filter: CHECKBOX_ID.ONE_STOP, name: 'Одна пересадка' },
  { filter: CHECKBOX_ID.TWO_STOPS, name: 'Две пересадки' },
  { filter: CHECKBOX_ID.THREE_STOPS, name: 'Три пересадки' },
];

export const Checkboxes: React.FC = () => {
  const activeCheckboxes = useSelector((state: { tickets: TicketsState }) => state.tickets.activeCheckboxes);
  const dispatch = useDispatch();

  const handleToggle = (id: CheckboxId) => {
    dispatch(toggleFilter(id));
  };

  return (
    <div className={styles.board}>
      <span className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {checkboxButtons.map(({ filter, name }) => (
        <label key={filter}>
          <input
            type="checkbox"
            checked={activeCheckboxes.includes(filter)}
            onChange={() => handleToggle(filter)}
          />
          {name}
        </label>
      ))}
    </div>
  );
};
