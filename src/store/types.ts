import { Ticket } from "../types/types";
import { FilterId, CheckboxId } from "../types/types";
  export interface TicketsState {
    tickets: Ticket[];
    searchId: string | null;
    status: boolean;
    stop: boolean;
    ticketsNum: number;
    activeFilterTab: FilterId;
    activeCheckboxes: CheckboxId[];
  }