import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent {
  insuranceForm: FormGroup;
  insuranceCost: number | null = null;

  constructor(private fb: FormBuilder) {
    this.insuranceForm = this.fb.group({
      carBrand: [''],
      carModel: [''],
      year: [new Date().getFullYear()],
      mileage: [0],
      location: ['']
    });
  }

  calculateInsurance() {
    const { carBrand, carModel, year, mileage, location } = this.insuranceForm.value;

    let baseCost = 500;
    let carAge = new Date().getFullYear() - year;

    const brandFactor = this.getBrandFactor(carBrand);
    const ageFactor = this.getAgeFactor(carAge);
    const mileageFactor = this.getMileageFactor(mileage);
    const locationFactor = this.getLocationFactor(location);

    this.insuranceCost = baseCost * brandFactor * ageFactor * mileageFactor * locationFactor;
  }

  getBrandFactor(brand: string): number {
    const luxuryBrands = ['BMW', 'Mercedes', 'Audi'];
    return luxuryBrands.includes(brand) ? 1.5 : 1.0;
  }

  getAgeFactor(age: number): number {
    if (age < 5) return 1.0;
    if (age < 10) return 1.2;
    return 1.5;
  }

  getMileageFactor(mileage: number): number {
    if (mileage < 50000) return 1.0;
    if (mileage < 100000) return 1.2;
    return 1.5;
  }

  getLocationFactor(location: string): number {
    const highRiskAreas = ['City Center', 'Urban'];
    return highRiskAreas.includes(location) ? 1.3 : 1.0;
  }
}
