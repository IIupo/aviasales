import { Ticket } from '../types/types';
import { CheckboxId, CHECKBOX_ID } from '../types/types';

type StopCount = 0 | 1 | 2 | 3;

export const useFilter = (tickets: Ticket[], activeFilters: CheckboxId[]) => {
  const filterTickets = (ticket: Ticket) => {
    const stopsCountOnward = ticket.segments[0].stops.length as StopCount;
    const stopsCountBackward = ticket.segments[1].stops.length as StopCount;

    if (activeFilters.length === 0) return true;

    const stopsFilters = activeFilters.map(filter => {
      switch (filter) {
        case CHECKBOX_ID.NO_STOPS:
          return 0;
        case CHECKBOX_ID.ONE_STOP:
          return 1;
        case CHECKBOX_ID.TWO_STOPS:
          return 2;
        case CHECKBOX_ID.THREE_STOPS:
          return 3;
        default:
          return true;
      }
    });

    return stopsFilters.some(stops =>
      (stopsCountOnward === stops && stopsFilters.includes(stopsCountBackward)) ||
      (stopsCountBackward === stops && stopsFilters.includes(stopsCountOnward))
    );
  };

  return tickets.filter(filterTickets);
};