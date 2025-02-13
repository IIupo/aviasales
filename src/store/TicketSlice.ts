import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets } from '../api/api';
import { TicketsState, Checkbox, CheckboxId, FilterId, FILTER_ID, CHECKBOX_ID, Ticket, Segment } from '../types/types';

export const fetchID = createAsyncThunk('tickets/fetchSearchId', async () => {
  return await fetchSearchId();
});

export const fetchTicketsAsync = createAsyncThunk('tickets/fetchTickets', async (searchId: string) => {
  return await fetchTickets(searchId);
});

const initialState: TicketsState = {
  tickets: [],
  searchId: null,
  status: false,
  stop: false,
  ticketsNum: 5,
  filterTabs: [
    { id: FILTER_ID.CHEAPER, text: 'Самые дешёвые', active: false },
    { id: FILTER_ID.FASTER, text: 'Самые быстрые', active: false },
    { id: FILTER_ID.OPTIMAL, text: 'Оптимальные', active: false },
  ],
  checkboxes: [
    { id: CHECKBOX_ID.ALL, label: 'Все', checked: false },
    { id: CHECKBOX_ID.NO_STOPS, label: 'Без пересадок', checked: false },
    { id: CHECKBOX_ID.ONE_STOP, label: '1 пересадка', checked: false },
    { id: CHECKBOX_ID.TWO_STOPS, label: '2 пересадки', checked: false },
    { id: CHECKBOX_ID.THREE_STOPS, label: '3 пересадки', checked: false },
  ],
};

const calculateTotalDuration = (ticket: Ticket) =>
  ticket.segments.reduce((acc: number, segment: Segment) => acc + segment.duration, 0);

const handleAllCheckbox = (state: TicketsState, filter: Checkbox) => {
  if (filter.id === CHECKBOX_ID.ALL) {
    state.checkboxes.forEach((f: Checkbox) => {
      if (f.id !== CHECKBOX_ID.ALL) f.checked = filter.checked;
    });
  } else {
    const allChecked = state.checkboxes.every((f: Checkbox) => f.id !== CHECKBOX_ID.ALL ? f.checked : true);
    state.checkboxes.find((f: Checkbox) => f.id === CHECKBOX_ID.ALL)!.checked = allChecked;
  }
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMoreTicket: (state) => {
      state.ticketsNum += 5;
    },

    toggleFilter: (state, action: PayloadAction<CheckboxId>) => {
      const filter = state.checkboxes.find((f: Checkbox) => f.id === action.payload);
      if (filter) {
        filter.checked = !filter.checked;
        handleAllCheckbox(state, filter);
      }
    },

    setActiveFilterTab: (state, action: PayloadAction<FilterId>) => {
      state.filterTabs.forEach((button) => {
        button.active = button.id === action.payload;
      });
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