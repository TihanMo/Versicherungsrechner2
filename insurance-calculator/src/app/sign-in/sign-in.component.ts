import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
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
