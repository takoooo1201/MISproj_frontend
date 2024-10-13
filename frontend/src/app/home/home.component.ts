import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true, 
  imports: [RouterModule,HeaderComponent, NavComponent], 

  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/einvoice']);
  }

  navigateToNotDeveloped() {
    this.router.navigate(['/not-developed']);
  }
}

