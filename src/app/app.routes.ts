import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ProfilePage } from './pages/profile/profile';
import { Choose } from './pages/choose/choose';
import { Lender } from './pages/lender/lender';
import { Borrower } from './pages/borrower/borrower';

const base = 'Sallafni';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full', title: `${base} – Why buy it when you can borrow it` },
  { path: 'login', component: Login, title: `Log in – ${base}` },
  { path: 'profile', component: ProfilePage, title: `Your profile – ${base}` },
  { path: 'choose', component: Choose, title: `Borrow or lend – ${base}` },
  { path: 'lender', component: Lender, title: `Lender dashboard – ${base}` },
  { path: 'borrower', component: Borrower, title: `Borrow – ${base}` },
  { path: '**', redirectTo: '' },
];
