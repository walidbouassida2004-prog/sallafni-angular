import { Injectable, computed, signal } from '@angular/core';
import { CATEGORY_ICON, CITIES, INITIAL_INCOMING, INITIAL_LOANS, INITIAL_REQS, ITEMS, PEOPLE } from './data';
import { BorrowRequest, Category, Incoming, Item, Loan, Person, Profile, RateTarget } from './models';

const PROFILE_KEY = 'sallafni.profile';

export const norm = (s: unknown) =>
  String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const priceLabel = (p: number) => (p ? '€' + p + '/day' : 'Free to borrow');

const haversineKm = (a: [number, number], b: [number, number]) => {
  const r = (x: number) => (x * Math.PI) / 180;
  const dA = r(b[0] - a[0]), dO = r(b[1] - a[1]);
  const h = Math.sin(dA / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dO / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

function loadProfile(): Profile | null {
  try {
    const v = JSON.parse(localStorage.getItem(PROFILE_KEY) ?? 'null');
    return v ?? null;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class Store {
  readonly items: Item[] = ITEMS;

  readonly profile = signal<Profile | null>(loadProfile());
  readonly people = signal<Record<string, Person>>(structuredClone(PEOPLE));

  readonly mine = signal<Item[]>(ITEMS.slice(0, 3).map((x) => ({ ...x, o: 'You' })));
  readonly requested = signal<ReadonlySet<number>>(new Set());
  readonly reqs = signal<BorrowRequest[]>(structuredClone(INITIAL_REQS));
  readonly loans = signal<Loan[]>(structuredClone(INITIAL_LOANS));
  readonly incoming = signal<Incoming[]>(structuredClone(INITIAL_INCOMING));

  // Borrow filters (the top-bar search box shares `query`)
  readonly query = signal('');
  readonly category = signal('');
  readonly freeOnly = signal('');

  readonly filtered = computed(() => {
    const c = this.category(), f = this.freeOnly(), q = this.query().toLowerCase();
    return this.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => (!c || item.c === c) && (!f || item.p === 0) && (!q || (item.n + item.d).toLowerCase().includes(q)));
  });

  // ---------- people, scores, distance ----------
  scoreOf(name: string): string | null {
    const p = this.people()[name];
    return p && p.n ? (p.sum / p.n).toFixed(1) : null;
  }

  coordsOf(p: Partial<Profile> & { city?: string } | null | undefined): [number, number] | null {
    if (!p) return null;
    if ('lat' in p && p.lat != null && p.lng != null) return [p.lat, p.lng];
    return CITIES[norm(p.city)] ?? null;
  }

  distanceKm(item: Item): number | null {
    const a = this.coordsOf(this.people()[item.o]);
    const me = this.coordsOf(this.profile());
    return a && me ? haversineKm(me, a) : null;
  }

  // ---------- profile ----------
  saveProfile(p: Profile) {
    this.profile.set(p);
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
  }

  // ---------- borrower flow ----------
  sendRequest(index: number, from: string, to: string) {
    const it = this.items[index];
    const fmt = (s: string) => new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    this.requested.update((s) => new Set(s).add(index));
    this.reqs.update((r) => [{ it: it.n, o: it.o, st: 'Pending', info: `Pick-up ${fmt(from)} · Return ${fmt(to)}` }, ...r]);
  }

  returnRequest(i: number) {
    this.reqs.update((list) => list.map((r, k) => (k === i ? { ...r, st: 'Returned', info: 'Returned today', rated: 0 } : r)));
  }

  // ---------- lender flow ----------
  addItem(data: { n: string; c: Category; p: number; cond: string; img: string }) {
    this.mine.update((m) => [...m, { n: data.n, d: data.c, c: data.c, p: data.p, o: 'You', i: CATEGORY_ICON[data.c], col: '#eef2f7', img: data.img, cond: data.cond }]);
  }

  answerIncoming(i: number, accept: boolean) {
    const req = this.incoming()[i];
    this.incoming.update((list) => list.map((r, k) => (k === i ? { ...r, state: accept ? 'accepted' : 'declined' } : r)));
    if (accept) this.loans.update((l) => [{ who: req.who, it: req.item, st: 'Active', info: 'Accepted, waiting for return' }, ...l]);
  }

  returnLoan(i: number) {
    this.loans.update((list) => list.map((l, k) => (k === i ? { ...l, st: 'Returned', info: 'Returned today', rated: 0 } : l)));
  }

  // ---------- ratings ----------
  rateeOf(t: RateTarget): string {
    return t.kind === 'req' ? this.reqs()[t.index].o : this.loans()[t.index].who;
  }

  rate(t: RateTarget, score: number) {
    const name = this.rateeOf(t);
    this.people.update((p) => ({ ...p, [name]: { ...p[name], sum: p[name].sum + score, n: p[name].n + 1 } }));
    if (t.kind === 'req') this.reqs.update((l) => l.map((r, k) => (k === t.index ? { ...r, rated: score } : r)));
    else this.loans.update((l) => l.map((r, k) => (k === t.index ? { ...r, rated: score } : r)));
  }
}
