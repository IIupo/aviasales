import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../Ticket';
import { fetchID, fetchTicketsAsync, showMoreTicket } from '../../store/TicketSlice';
import { FilterTabs } from '../FiltersTabs';
import { Ticket, TicketsState } from '../../types/types';
import { AppDispatch } from '../../store/index';
import styles from './Page.module.css';
import { Spin } from 'antd'

export const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, searchId, stop, checkboxes, ticketsNum, status } = useSelector(
    (state: { tickets: TicketsState }) => state.tickets
  );
  const activeFilters = checkboxes
    .filter((filter) => filter.checked && filter.id !== 'all')
    .map((filter) => filter.id);

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

  const filterTickets = (ticket: Ticket) => {
    const stopsCountOnward = ticket.segments[0].stops.length;
    const stopsCountBackward = ticket.segments[1].stops.length;

    if (activeFilters.length === 0) return true;

    return activeFilters.some((filter) => {
      switch (filter) {
        case 'no_stops':
          return stopsCountOnward === 0 && stopsCountBackward === 0;
        case 'one_stop':
          return stopsCountOnward === 1 && stopsCountBackward === 1;
        case 'two_stops':
          return stopsCountOnward === 2 && stopsCountBackward === 2;
        case 'three_stops':
          return stopsCountOnward === 3 && stopsCountBackward === 3;
        default:
          return false;
      }
    });
  };

  const filteredTickets = tickets.filter(filterTickets);

  return (
    <div>
    <FilterTabs />
    <ul className={styles.list}>
    {status ? 
    <Spin
      size='large'
    /> : null} 
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
