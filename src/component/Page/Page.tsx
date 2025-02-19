import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../Ticket';
import { fetchID, fetchTicketsAsync, showMoreTicket } from '../../store/TicketSlice';
import { FilterTabs } from '../FiltersTabs';
import { CHECKBOX_ID } from '../../types/types';
import { AppDispatch } from '../../store/index';
import styles from './Page.module.css';
import { Spin } from 'antd';
import { useFilter } from '../../hooks/useFilter';
import { TicketsState } from '../../store/types';

export const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, searchId, stop, activeCheckboxes, ticketsNum, status } = useSelector(
    (state: { tickets: TicketsState }) => state.tickets
  );

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchID());
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTicketsAsync(searchId));
    }
  }, [dispatch, searchId, stop]);

  const activeFilters = activeCheckboxes.filter(id => id !== CHECKBOX_ID.ALL);
  const filteredTickets = useFilter(tickets, activeFilters);

  return (
    <div>
      <FilterTabs />
      <ul className={styles.list}>
        {status ? (
          <Spin size='large' />
        ) : null}
        {filteredTickets.slice(0, ticketsNum).map((ticket, index) => (
          <Card key={index} ticket={ticket} />
        ))}
      </ul>
      <button className={styles.btn} onClick={() => dispatch(showMoreTicket())}>
        Показать еще 5 билетов
      </button>
    </div>
  );
};