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
    const { baseCost } = params;

    const basicCost = baseCost * 1.0;
    const standardCost = baseCost * 1.2;
    const premiumCost = baseCost * 1.5;

    this.insuranceTypes = [
      { name: 'Basis', value: 'basic', description: 'Eine grundlegende Versicherung mit minimaler Abdeckung zu einem erschwinglichen Preis', cost: basicCost },
      { name: 'Standard', value: 'standard', description: 'Eine umfassendere Versicherung, die zusätzlichen Schutz und Leistungen bietet', cost: standardCost },
      { name: 'Premium', value: 'premium', description: 'Eine umfassende Versicherung mit maximaler Abdeckung und zusätzlichen Vorteilen für vollständige Sicherheit.', cost: premiumCost }
    ];
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
    const params = {
      ...this.queryParams,
      selectedPackage: type.value,
      insuranceSum: type.cost
    };
    this.router.navigate(['/abschluss'], { queryParams: params });
  }

  goBack() {
    this.router.navigate(['/versicherungsrechner']);
  }
}
