import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  template: `
    <h1>Welcome to Car Insurance Calculator</h1>
    <p>Use our calculator to estimate your car insurance cost.</p>
    <a routerLink="/calculate">Start Calculating</a>
  `
})
export class LandingPageComponent {}
