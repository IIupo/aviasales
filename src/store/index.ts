import { configureStore } from '@reduxjs/toolkit';
import { ticketsReducer } from './TicketSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;