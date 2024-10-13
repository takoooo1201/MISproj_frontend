import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/einvoice']);
  }

  navigateToNotDeveloped() {
    this.router.navigate(['/not-developed']);
  }
}
