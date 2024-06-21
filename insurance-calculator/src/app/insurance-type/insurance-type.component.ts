import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.css']
})
export class InsuranceTypeComponent {
  insuranceTypes: any[] = [];
  queryParams: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.calculateInsuranceOptions(params);
    });
  }

  calculateInsuranceOptions(params: any) {
    const { carBrand, carModel, year, mileage, location, driverAge, experience } = params;

    const baseCost = 500;
    const carAge = new Date().getFullYear() - year;

    const brandFactor = this.getBrandFactor(carBrand);
    const ageFactor = this.getAgeFactor(carAge);
    const mileageFactor = this.getMileageFactor(mileage);
    const locationFactor = this.getLocationFactor(location);
    const driverAgeFactor = this.getDriverAgeFactor(driverAge);
    const experienceFactor = this.getExperienceFactor(experience);

    const basicCost = baseCost * brandFactor * ageFactor * mileageFactor * locationFactor * driverAgeFactor * experienceFactor * 1.0;
    const standardCost = baseCost * brandFactor * ageFactor * mileageFactor * locationFactor * driverAgeFactor * experienceFactor * 1.5;
    const premiumCost = baseCost * brandFactor * ageFactor * mileageFactor * locationFactor * driverAgeFactor * experienceFactor * 2.0;

    this.insuranceTypes = [
      { name: 'Basis', value: 'basic', description: 'Basisversicherung', cost: basicCost },
      { name: 'Standard', value: 'standard', description: 'Standardversicherung', cost: standardCost },
      { name: 'Premium', value: 'premium', description: 'Premiumversicherung', cost: premiumCost }
    ];
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

  getImageForType(type: string): string {
    switch (type) {
      case 'premium':
        return 'assets/premium-car.jpg';
      case 'standard':
        return 'assets/standard-car.jpg';
      default:
        return 'assets/basic-car.jpg';
    }
  }

  selectType(type: any) {
    console.log('Selected Type:', type);
  }

  goBack() {
    this.router.navigate(['/versicherungsrechner']);
  }
}
