export interface Ticket {
    price: number;
    carrier: string;
    segments: [Segment, Segment];
  }

  export interface Segment {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
  }
  export interface TicketsState {
    tickets: Ticket[];
    searchId: string | null;
    status: boolean;
    stop: boolean;
    ticketsNum: number;
    activeFilterTab: FILTER_ID;
    activeCheckboxes: CHECKBOX_ID[];
  }

  export enum FILTER_ID {
    CHEAPER = 'CHEAPER',
    FASTER = 'FASTER',
    OPTIMAL = 'OPTIMAL',
  }
  
  export enum CHECKBOX_ID {
    ALL = 'ALL',
    NO_STOPS = 'NO_STOPS',
    ONE_STOP = 'ONE_STOP',
    TWO_STOPS = 'TWO_STOPS',
    THREE_STOPS = 'THREE_STOPS',
  }
  
  export const FILTER_TABS_LABELS = {
    [FILTER_ID.CHEAPER]: 'Самые дешёвые',
    [FILTER_ID.FASTER]: 'Самые быстрые',
    [FILTER_ID.OPTIMAL]: 'Оптимальные',
  };
  
  export const CHECKBOX_LABELS = {
    [CHECKBOX_ID.ALL]: 'Все',
    [CHECKBOX_ID.NO_STOPS]: 'Без пересадок',
    [CHECKBOX_ID.ONE_STOP]: '1 пересадка',
    [CHECKBOX_ID.TWO_STOPS]: '2 пересадки',
    [CHECKBOX_ID.THREE_STOPS]: '3 пересадки',
  };
  