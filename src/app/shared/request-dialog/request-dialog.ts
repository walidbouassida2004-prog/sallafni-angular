import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, priceLabel } from '../../core/store';

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

@Component({
  selector: 'app-request-dialog',
  imports: [RouterLink],
  templateUrl: './request-dialog.html',
})
export class RequestDialog {
  protected readonly store = inject(Store);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  protected readonly index = signal(-1);
  protected readonly from = signal('');
  protected readonly to = signal('');
  protected readonly showError = signal(false);
  protected readonly today = ymd(new Date());
  protected readonly price = priceLabel;

  protected readonly item = computed(() => this.store.items[this.index()]);
  protected readonly owner = computed(() => this.store.people()[this.item()?.o]);
  protected readonly score = computed(() => (this.item() ? this.store.scoreOf(this.item().o) : null));
  protected readonly distance = computed(() => (this.item() ? this.store.distanceKm(this.item()) : null));
  protected readonly coords = computed(() => this.store.coordsOf(this.owner()));
  protected readonly mapUrl = computed(() => {
    const c = this.coords();
    return c ? `https://www.openstreetmap.org/?mlat=${c[0]}&mlon=${c[1]}#map=13/${c[0]}/${c[1]}` : '';
  });

  protected readonly duration = computed(() => {
    const f = this.from(), t = this.to();
    if (!f || !t || t < f) return 'Choose your dates.';
    const days = Math.round((new Date(t).getTime() - new Date(f).getTime()) / 864e5) + 1;
    const p = this.item().p;
    return `${days} ${days > 1 ? 'days' : 'day'}` + (p ? ` · total €${days * p}` : ' · free');
  });

  open(index: number) {
    this.index.set(index);
    this.from.set('');
    this.to.set('');
    this.showError.set(false);
    this.dlg().nativeElement.showModal();
  }

  protected close() {
    this.dlg().nativeElement.close();
  }

  protected rounded(d: number) {
    return d < 10 ? d.toFixed(1) : String(Math.round(d));
  }

  protected submit(e: Event) {
    e.preventDefault();
    const f = this.from(), t = this.to();
    if (!f || !t || t < f || f < this.today) {
      this.showError.set(true);
      return;
    }
    this.store.sendRequest(this.index(), f, t);
    this.close();
  }
}
