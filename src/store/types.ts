import { TicketsState } from "../types/types";
import { FILTER_ID, CHECKBOX_ID } from "../types/types";

export const initialState: TicketsState = {
  tickets: [],
  searchId: null,
  status: false,
  stop: false,
  ticketsNum: 5,
  activeFilterTab: FILTER_ID.CHEAPER,
  activeCheckboxes: [CHECKBOX_ID.NO_STOPS],
};