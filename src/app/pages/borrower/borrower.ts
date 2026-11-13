import { Component, inject, viewChild } from '@angular/core';
import { CATEGORIES } from '../../core/data';
import { Store } from '../../core/store';
import { ItemCard } from '../../shared/item-card/item-card';
import { RateDialog } from '../../shared/rate-dialog/rate-dialog';
import { RequestDialog } from '../../shared/request-dialog/request-dialog';

@Component({ selector: 'app-borrower', imports: [ItemCard, RequestDialog, RateDialog], templateUrl: './borrower.html' })
export class Borrower {
  protected readonly store = inject(Store);
  private readonly requestDialog = viewChild.required(RequestDialog);
  private readonly rateDialog = viewChild.required(RateDialog);

  protected readonly categories = CATEGORIES;
  protected readonly badge = { Pending: 'b-wait', Accepted: 'b-ok', Active: 'b-ok', Returned: 'b-done' } as const;

  protected request(index: number) { this.requestDialog().open(index); }
  protected rate(index: number) { this.rateDialog().open({ kind: 'req', index }); }
  protected owner(name: string) { return this.store.people()[name]; }
}
