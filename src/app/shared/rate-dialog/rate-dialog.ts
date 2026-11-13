import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RateTarget } from '../../core/models';
import { Store } from '../../core/store';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.html',
})
export class RateDialog {
  private readonly store = inject(Store);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  protected readonly scores = Array.from({ length: 10 }, (_, i) => i + 1);
  protected readonly target = signal<RateTarget | null>(null);
  protected readonly name = signal('');
  protected readonly selected = signal(0);
  protected readonly showError = signal(false);

  open(target: RateTarget) {
    this.target.set(target);
    this.name.set(this.store.rateeOf(target));
    this.selected.set(0);
    this.showError.set(false);
    this.dlg().nativeElement.showModal();
  }

  protected close() {
    this.dlg().nativeElement.close();
  }

  protected submit(e: Event) {
    e.preventDefault();
    const t = this.target();
    if (!this.selected() || !t) {
      this.showError.set(true);
      return;
    }
    this.store.rate(t, this.selected());
    this.close();
  }
}
