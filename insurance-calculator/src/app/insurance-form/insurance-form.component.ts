import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})

export class InsuranceFormComponent {
  carModel: string = '';
  year: number = new Date().getFullYear();
  age: number = 18;
  history: number = 0;
  insuranceCost: number | null = null;

  calculateInsurance() {
    const baseCost = 500;
    const ageFactor = (this.age < 25) ? 1.2 : 1;
    const historyFactor = (this.history < 5) ? 1.5 : 1;
    const yearFactor = (this.year < 2015) ? 1.3 : 1;

    this.insuranceCost = baseCost * ageFactor * historyFactor * yearFactor;
  }
}
