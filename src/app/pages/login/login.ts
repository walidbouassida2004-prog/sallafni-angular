import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../../core/store';

@Component({ selector: 'app-login', imports: [RouterLink], templateUrl: './login.html' })
export class Login {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly emailError = signal(false);
  protected readonly passwordError = signal(false);

  protected submit(e: Event) {
    e.preventDefault();
    const okEmail = /^\S+@\S+\.\S+$/.test(this.email());
    const okPassword = this.password().length >= 8;
    this.emailError.set(!okEmail);
    this.passwordError.set(!okPassword);
    if (okEmail && okPassword) this.router.navigateByUrl(this.store.profile() ? '/choose' : '/profile');
  }
}
