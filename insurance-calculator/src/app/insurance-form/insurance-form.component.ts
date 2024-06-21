import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  carBrands: string[] = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Jeep', 'Dodge', 'Ram', 'Chrysler', 'Fiat', 'Alfa Romeo'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.insuranceForm = this.fb.group({
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      mileage: [0, Validators.required],
      driverAge: [18, Validators.required],
      experience: [0, Validators.required],
      horsepower: [0, Validators.required],
      fuel: ['', Validators.required]
    });
  }

  navigateToInsuranceType() {
    const { carBrand, carModel, year, mileage, driverAge, experience, horsepower, fuel } = this.insuranceForm.value;

    this.router.navigate(['/versicherungsplan'], {
      queryParams: {
        carBrand,
        carModel,
        year,
        mileage,
        driverAge,
        experience,
        horsepower,
        fuel
      }
    });
  }

  calculateInsurance() {
    const { carBrand, carModel, year, mileage, driverAge, experience, horsepower, fuel, coverageType } = this.insuranceForm.value;

    let baseCost = 500;
    let carAge = new Date().getFullYear() - year;

    const brandFactor = this.getBrandFactor(carBrand);
    const ageFactor = this.getAgeFactor(carAge);
    const mileageFactor = this.getMileageFactor(mileage);
    const driverAgeFactor = this.getDriverAgeFactor(driverAge);
    const experienceFactor = this.getExperienceFactor(experience);
    const horsepowerFactor = this.getHorsepowerFactor(horsepower);
    const fuelFactor = this.getFuelFactor(fuel);
    const coverageFactor = this.getCoverageFactor(coverageType);

    this.insuranceCost = baseCost * brandFactor * ageFactor * mileageFactor * driverAgeFactor * experienceFactor * horsepowerFactor * fuelFactor * coverageFactor;
  }

  getBrandFactor(brand: string): number {
    const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Alfa Romeo'];
    const midRangeBrands = ['Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru'];
    const economyBrands = ['Ford', 'Chevrolet', 'Nissan', 'Jeep', 'Dodge', 'Ram', 'Chrysler', 'Fiat'];

    if (luxuryBrands.includes(brand)) return 1.5;
    if (midRangeBrands.includes(brand)) return 1.2;
    if (economyBrands.includes(brand)) return 1.0;
    return 1.0;
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

  getHorsepowerFactor(horsepower: number): number {
    if (horsepower < 100) return 1.0;
    if (horsepower < 200) return 1.2;
    return 1.5;
  }

  getFuelFactor(fuel: string): number {
    if (fuel === 'electric') return 1.0;
    if (fuel === 'hybrid') return 1.2;
    return 1.5;
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
