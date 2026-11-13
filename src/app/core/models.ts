export type Category = 'Tools' | 'Outdoor' | 'Bikes' | 'Electronics' | 'Party gear';
export type IconName = 'tool' | 'tent' | 'bike' | 'device' | 'bbq';

export interface Item {
  n: string;
  d: string;
  c: Category;
  p: number;
  o: string;
  i: IconName;
  col: string;
  img?: string;
  cond: string;
}

export interface Person {
  city?: string;
  area?: string;
  street?: string;
  sum: number;
  n: number;
}

export interface Profile {
  fn: string; ln: string; country: string; phone: string;
  street: string; line2: string; city: string; state: string; zip: string;
  lat?: number; lng?: number;
}

export type Status = 'Pending' | 'Accepted' | 'Active' | 'Returned';

export interface BorrowRequest { it: string; o: string; st: Status; info: string; rated?: number; }
export interface Loan { who: string; it: string; st: Status; info: string; rated?: number; }
export interface Incoming { who: string; item: string; dates: string; note: string; state: 'open' | 'accepted' | 'declined'; }

export type RateTarget = { kind: 'req' | 'loan'; index: number };
