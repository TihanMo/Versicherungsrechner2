import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLoading(event: Event) {
    event.preventDefault();
    const button = (event.target as HTMLFormElement).querySelector('button');
    if (button) {
      button.textContent = 'Lädt...';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Anmelden';
        button.disabled = false;
      }, 2000);
    }
  }
}
