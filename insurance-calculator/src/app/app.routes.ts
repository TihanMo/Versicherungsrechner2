import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'calculate', component: InsuranceFormComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'sign-in', component: SignInComponent},
  { path: 'login', component: LoginComponent },
];
