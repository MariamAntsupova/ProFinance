import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignUp } from './components/sign-up/sign-up';
import { LogIn } from './components/log-in/log-in';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signup', component: SignUp },
  { path: 'login', component:LogIn}
];