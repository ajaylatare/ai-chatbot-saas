import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './plans.html',
  styleUrl: './plans.css'
})
export class Plans implements OnInit {
  currentPlan = 'free';
  isLoading = false;
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrentPlan();
  }

  loadCurrentPlan() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.currentPlan = res.data.plan;
      },
      error: () => {}
    });
  }

  upgradePlan() {
    this.isLoading = true;
    this.authService.upgradePlan().subscribe({
      next: (res: any) => {
        this.message = '🎉 Plan upgraded successfully!';
        this.currentPlan = 'paid';
        this.isLoading = false;
      },
      error: () => {
        this.message = '❌ Upgrade failed. Try again!';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}