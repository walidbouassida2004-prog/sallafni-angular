import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, CONDITIONS } from '../../core/data';
import { Category } from '../../core/models';
import { Store } from '../../core/store';
import { ItemCard } from '../../shared/item-card/item-card';
import { RateDialog } from '../../shared/rate-dialog/rate-dialog';

@Component({ selector: 'app-lender', imports: [FormsModule, ItemCard, RateDialog], templateUrl: './lender.html' })
export class Lender {
  protected readonly store = inject(Store);
  private readonly rateDialog = viewChild.required(RateDialog);
  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('photo');

  protected readonly categories = CATEGORIES;
  protected readonly conditions = CONDITIONS;
  protected readonly badge = { Pending: 'b-wait', Accepted: 'b-ok', Active: 'b-ok', Returned: 'b-done' } as const;

  protected form = { name: '', cat: 'Tools' as Category, cond: 'Good', price: 0 };
  protected readonly photoUrl = signal('');
  protected readonly photoError = signal(false);

  protected rate(index: number) {
    this.rateDialog().open({ kind: 'loan', index });
  }

  protected onPhoto(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    this.photoError.set(false);
    if (!file) { this.photoUrl.set(''); return; }
    if (!file.type.startsWith('image/')) {
      this.photoError.set(true);
      input.value = '';
      this.photoUrl.set('');
      return;
    }
    this.photoUrl.set(URL.createObjectURL(file));
  }

  protected addItem() {
    this.store.addItem({ n: this.form.name, c: this.form.cat, p: Number(this.form.price) || 0, cond: this.form.cond, img: this.photoUrl() });
    this.form = { name: '', cat: 'Tools', cond: 'Good', price: 0 };
    this.fileInput().nativeElement.value = '';
    this.photoUrl.set('');
  }
}
