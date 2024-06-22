import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance-summary.component.html',
  styleUrls: ['./insurance-summary.component.css']
})
export class InsuranceSummaryComponent {
  insuranceSum!: number;
  selectedPackage!: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.insuranceSum = params['insuranceSum'];
      this.selectedPackage = params['selectedPackage'];
    });
  }

  redirectToExternal() {
    window.location.href = 'https://www.example.com';
  }
}
