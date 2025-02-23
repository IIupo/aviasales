import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets } from '../api/api';
import { Ticket, Segment } from '../types/types';
import { CHECKBOX_ID, CheckboxId, FilterId, FILTER_ID } from '../types/types';
import { TicketsState } from './types';
export const fetchID = createAsyncThunk('tickets/fetchSearchId', async () => {
  return await fetchSearchId();
});

export const fetchTicketsAsync = createAsyncThunk('tickets/fetchTickets', async (searchId: string) => {
  return await fetchTickets(searchId);
});

const calculateTotalDuration = (ticket: Ticket) =>
  ticket.segments.reduce((acc: number, segment: Segment) => acc + segment.duration, 0);

const handleAllCheckbox = (state: TicketsState, filter: CheckboxId) => {
  if (filter === CHECKBOX_ID.ALL) {
    if (!state.activeCheckboxes.includes(CHECKBOX_ID.ALL)) {
      state.activeCheckboxes = [CHECKBOX_ID.ALL];
    }
  } else {
    state.activeCheckboxes = state.activeCheckboxes.filter(id => id !== CHECKBOX_ID.ALL);

    if (state.activeCheckboxes.includes(filter)) {
      state.activeCheckboxes = state.activeCheckboxes.filter(id => id !== filter);
    } else {
      state.activeCheckboxes.push(filter);
    }
    if (state.activeCheckboxes.length === 0) {
      state.activeCheckboxes = [CHECKBOX_ID.ALL];
    }
  }
};

const initialState: TicketsState = {
  tickets: [],
  searchId: null,
  status: false,
  stop: false,
  ticketsNum: 5,
  activeFilterTab: FILTER_ID.CHEAPER,
  activeCheckboxes: [CHECKBOX_ID.NO_STOPS],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMoreTicket: (state) => {
      state.ticketsNum += 5;
    },

    toggleFilter: (state, action: PayloadAction<CheckboxId>) => {
      handleAllCheckbox(state, action.payload);
    },

    setActiveFilterTab: (state, action: PayloadAction<FilterId>) => {
      state.activeFilterTab = action.payload;
    },

    sortByPrice: (state) => {
      state.tickets.sort((a, b) => a.price - b.price);
    },

    sortByDuration: (state) => {
      state.tickets.sort((a, b) => calculateTotalDuration(a) - calculateTotalDuration(b));
    },

    sortByOptimal: (state) => {
      state.tickets.sort((a, b) => {
        const durationA = calculateTotalDuration(a);
        const durationB = calculateTotalDuration(b);
        return a.price * durationA - b.price * durationB;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchID.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.status = false;
      })
      .addCase(fetchTicketsAsync.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.stop = action.payload.stop;
        state.status = false;
      })
      .addCase(fetchID.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchTicketsAsync.pending, (state) => {
        state.status = true;
      });
  },
});

export const {
  setActiveFilterTab,
  sortByPrice,
  sortByDuration,
  sortByOptimal,
  showMoreTicket,
  toggleFilter,
} = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;