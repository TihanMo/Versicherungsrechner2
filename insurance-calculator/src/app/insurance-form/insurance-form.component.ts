import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.insuranceForm = this.fb.group({
      carBrand: [''],
      carModel: [''],
      year: [new Date().getFullYear()],
      mileage: [0],
      location: [''],
      driverAge: [18],
      experience: [0]
    });
  }

  navigateToInsuranceType() {
    const { carBrand, carModel, year, mileage, location, driverAge, experience } = this.insuranceForm.value;

    this.router.navigate(['/versicherungsplan'], {
      queryParams: {
        carBrand,
        carModel,
        year,
        mileage,
        location,
        driverAge,
        experience
      }
    });
  }

  calculateInsurance() {
    const { carBrand, carModel, year, mileage, location, driverAge, experience, coverageType } = this.insuranceForm.value;

    let baseCost = 500;
    let carAge = new Date().getFullYear() - year;

    const brandFactor = this.getBrandFactor(carBrand);
    const ageFactor = this.getAgeFactor(carAge);
    const mileageFactor = this.getMileageFactor(mileage);
    const locationFactor = this.getLocationFactor(location);
    const driverAgeFactor = this.getDriverAgeFactor(driverAge);
    const experienceFactor = this.getExperienceFactor(experience);
    const coverageFactor = this.getCoverageFactor(coverageType);

    this.insuranceCost = baseCost * brandFactor * ageFactor * mileageFactor * locationFactor * driverAgeFactor * experienceFactor * coverageFactor;
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

  getDriverAgeFactor(age: number): number {
    if (age < 25) return 1.5;
    if (age < 60) return 1.0;
    return 1.2;
  }

  getExperienceFactor(experience: number): number {
    if (experience < 2) return 1.5;
    if (experience < 5) return 1.2;
    return 1.0;
  }

  getCoverageFactor(type: string): number {
    switch (type) {
      case 'premium':
        return 2.0;
      case 'standard':
        return 1.5;
      default:
        return 1.0;
    }
  }
}
