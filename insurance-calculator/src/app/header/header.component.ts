import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/calculate">Calculate Insurance</a>
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
