import { Category, IconName, Incoming, Item, Loan, BorrowRequest, Person } from './models';

/** Approximate city-centre coordinates, used for distance when no device location is shared. */
export const CITIES: Record<string, [number, number]> = {
  tunis: [36.8065, 10.1815], ariana: [36.8665, 10.1647], 'ben arous': [36.7531, 10.2189],
  'la marsa': [36.8782, 10.3247], sousse: [35.8256, 10.6084], monastir: [35.7643, 10.8113],
  mahdia: [35.5047, 11.0622], sfax: [34.7406, 10.7603], nabeul: [36.4513, 10.7357],
  hammamet: [36.4, 10.6167], bizerte: [37.2744, 9.8739], kairouan: [35.6781, 10.0963],
  gabes: [33.8815, 10.0982], djerba: [33.875, 10.8575], gafsa: [34.425, 8.7842],
  tozeur: [33.9197, 8.1335], beja: [36.7256, 9.1817], jendouba: [36.5011, 8.7803],
  kasserine: [35.1676, 8.8365], medenine: [33.3549, 10.5055], tataouine: [32.9297, 10.4518],
};

/** Demo community (fictional). sum/n = total score points / number of ratings, out of 10. */
export const PEOPLE: Record<string, Person> = {
  Chris: { city: 'Tunis', area: 'Lac 2', street: '12 Rue du Lac Malaren', sum: 174, n: 20 },
  Zeb: { city: 'Ariana', area: 'Ennasr', street: '8 Avenue Hedi Nouira', sum: 96, n: 11 },
  Lina: { city: 'La Marsa', area: 'Gammarth', street: '21 Rue des Jasmins', sum: 187, n: 21 },
  Daan: { city: 'Sousse', area: 'Khezama', street: '5 Rue de la Corniche', sum: 62, n: 8 },
  Jeff: { city: 'Sfax', area: 'Route de Tunis', street: '3 Rue Ali Bach Hamba', sum: 140, n: 19 },
  Sara: { sum: 91, n: 10 }, Karim: { sum: 74, n: 10 }, Mehdi: { sum: 81, n: 10 }, Ons: { sum: 56, n: 6 },
};

export const ITEMS: Item[] = [
  { n: 'Power drill', d: 'Cordless, with 2 batteries', c: 'Tools', p: 0, o: 'Chris', i: 'tool', col: '#e8f3ff', img: 'images/drill.png', cond: 'Good' },
  { n: 'Camping tent', d: '3 person, waterproof', c: 'Outdoor', p: 0, o: 'Zeb', i: 'tent', col: '#e9f7ec', img: 'images/tent.png', cond: 'Like new' },
  { n: 'BMX bike', d: '20-inch, black', c: 'Bikes', p: 8, o: 'Lina', i: 'bike', col: '#fff4e0', img: 'images/bike.png', cond: 'Good' },
  { n: 'iPad Pro', d: 'With keyboard', c: 'Electronics', p: 25, o: 'Daan', i: 'device', col: '#f1ecff', cond: 'Like new' },
  { n: 'BBQ grill', d: 'Charcoal, with tools', c: 'Party gear', p: 10, o: 'Jeff', i: 'bbq', col: '#ffeceb', cond: 'Fair' },
  { n: 'Hand truck', d: 'Folds flat', c: 'Tools', p: 0, o: 'Chris', i: 'tool', col: '#e8f3ff', cond: 'Good' },
];

export const CATEGORIES: Category[] = ['Tools', 'Outdoor', 'Bikes', 'Electronics', 'Party gear'];
export const CATEGORY_ICON: Record<Category, IconName> = {
  Tools: 'tool', Outdoor: 'tent', Bikes: 'bike', Electronics: 'device', 'Party gear': 'bbq',
};
export const CONDITIONS = ['New', 'Like new', 'Good', 'Fair', 'Worn but works'];
export const HOME_CHIPS = ['Sound & Video', 'Gaming', 'Pets', 'Tools', 'Outdoor', 'Bikes', 'Party gear'];

export const STEPS = {
  lend: [
    ['1. Add items', 'Add a photo and the condition of what you want to share'],
    ['2. Accept', 'Check requests with their dates; accept if it suits you'],
    ['3. Free or fee', 'Decide if your listing is free or for a small fee'],
    ['Peace of mind', 'You stay in control of who borrows and when it comes back'],
  ],
  borrow: [
    ['1. Search', 'Find what you need from neighbors close by'],
    ['2. Request', 'Choose your pick-up and return dates and send a request'],
    ['3. Pick up', 'Meet your neighbor and collect the item'],
    ['4. Return', 'Give it back on the agreed date and leave a review'],
  ],
};

export const INITIAL_REQS: BorrowRequest[] = [
  { it: 'Hand truck', o: 'Chris', st: 'Accepted', info: 'Return by 9 Nov' },
  { it: 'iPad Pro', o: 'Daan', st: 'Pending', info: 'Waiting for reply' },
  { it: 'Bike pump', o: 'Lina', st: 'Returned', info: 'Returned 28 Oct', rated: 0 },
];
export const INITIAL_LOANS: Loan[] = [
  { who: 'Mehdi', it: 'Power drill', st: 'Returned', info: 'Returned 30 Oct', rated: 0 },
  { who: 'Ons', it: 'Camping tent', st: 'Returned', info: 'Returned 21 Oct', rated: 8 },
];
export const INITIAL_INCOMING: Incoming[] = [
  { who: 'Sara', item: 'Power drill', dates: 'Sat 7 – Sun 8 Nov', note: 'Hanging shelves', state: 'open' },
  { who: 'Karim', item: 'Camping tent', dates: 'Fri 13 – Mon 16 Nov', note: 'Weekend trip', state: 'open' },
];
