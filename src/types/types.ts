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

  export const CHECKBOX_ID = {
    ALL: 'all',
    NO_STOPS: 'no_stops',
    ONE_STOP: 'one_stop',
    TWO_STOPS: 'two_stops',
    THREE_STOPS: 'three_stops',
  } as const;
  
  export const FILTER_ID = {
    ALL: 'all',
    CHEAPER: 'cheaper',
    FASTER: 'faster',
    OPTIMAL: 'optimal',
  } as const;
  
  export type CheckboxId = typeof CHECKBOX_ID[keyof typeof CHECKBOX_ID];
  export type FilterId = typeof FILTER_ID[keyof typeof FILTER_ID];