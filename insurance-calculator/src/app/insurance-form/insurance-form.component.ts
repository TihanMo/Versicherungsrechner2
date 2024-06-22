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
      mileage: [0, [Validators.required, Validators.min(0)]],
      driverAge: [18, [Validators.required, Validators.min(18)]],
      experience: [0, [Validators.required, Validators.min(0)]],
      horsepower: [0, [Validators.required, Validators.min(0)]],
      fuel: ['', Validators.required]
    });
  }

  navigateToInsuranceType() {
    if (this.insuranceForm.valid) {
      const { carBrand, carModel, year, mileage, driverAge, experience, horsepower, fuel } = this.insuranceForm.value;
      const baseCost = this.calculateBaseInsurance(carBrand, year, mileage, driverAge, experience, horsepower, fuel);

      this.router.navigate(['/versicherungsplan'], {
        queryParams: {
          carBrand,
          carModel,
          year,
          mileage,
          driverAge,
          experience,
          horsepower,
          fuel,
          baseCost
        }
      });
    }
  }

  calculateBaseInsurance(carBrand: string, year: number, mileage: number, driverAge: number, experience: number, horsepower: number, fuel: string): number {
    const baseCost = 200;
    const carAge = new Date().getFullYear() - year;

    const brandFactor = this.getBrandFactor(carBrand);
    const ageFactor = this.getAgeFactor(carAge);
    const mileageFactor = this.getMileageFactor(mileage);
    const driverAgeFactor = this.getDriverAgeFactor(driverAge);
    const experienceFactor = this.getExperienceFactor(experience);
    const horsepowerFactor = this.getHorsepowerFactor(horsepower);
    const fuelFactor = this.getFuelFactor(fuel);
    const bonusFactor = this.getBonusFactor(driverAge, experience);

    return baseCost * brandFactor * ageFactor * mileageFactor * driverAgeFactor * experienceFactor * horsepowerFactor * fuelFactor * bonusFactor;
  }

  getBrandFactor(brand: string): number {
    const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Alfa Romeo'];
    const midRangeBrands = ['Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru'];
    const economyBrands = ['Ford', 'Chevrolet', 'Nissan', 'Jeep', 'Dodge', 'Ram', 'Chrysler', 'Fiat'];

    if (luxuryBrands.includes(brand)) return 1.3;
    if (midRangeBrands.includes(brand)) return 1.1;
    if (economyBrands.includes(brand)) return 1.0;
    return 1.0;
  }

  getAgeFactor(age: number): number {
    if (age < 5) return 1.0;
    if (age < 10) return 1.1;
    return 1.2;
  }

  getMileageFactor(mileage: number): number {
    if (mileage < 50000) return 1.0;
    if (mileage < 100000) return 1.1;
    return 1.2;
  }

  getDriverAgeFactor(age: number): number {
    if (age < 25) return 1.3;
    if (age < 60) return 1.0;
    return 1.1;
  }

  getExperienceFactor(experience: number): number {
    if (experience < 2) return 1.3;
    if (experience < 5) return 1.1;
    return 1.0;
  }

  getHorsepowerFactor(horsepower: number): number {
    if (horsepower < 100) return 1.0;
    if (horsepower < 200) return 1.1;
    return 1.2;
  }

  getFuelFactor(fuel: string): number {
    if (fuel === 'electric') return 1.0;
    if (fuel === 'hybrid') return 1.1;
    return 1.2;
  }

  getBonusFactor(driverAge: number, experience: number): number {
    let bonus = 1.0;
    if (driverAge > 50) {
      bonus -= 0.1;
    }
    if (experience > 10) {
      bonus -= 0.1;
    }
    return bonus;
  }
}
