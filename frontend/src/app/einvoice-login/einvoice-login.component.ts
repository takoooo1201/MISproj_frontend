import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-einvoice-login',
  templateUrl: './einvoice-login.component.html',
  styleUrls: ['./einvoice-login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    RouterModule
  ],
})
export class EinvoiceLoginComponent {
 
  username: string = '';
  password: string = '';
  message: string = '';
  signature: string = '';
  timeStamp: string = '';
  responseData: any;
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService) {}
  private http = inject(HttpClient);
  private router = inject(Router);
  

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    const loginData = {
      username: this.username,
      password: this.password
    };
    this.authService.setCredentials(this.username, this.password);
    this.http.post<any>('/local-api/api/login', loginData)
      .subscribe(
        (response) => {
          console.log('Response:', response);
          this.message = response.message;
          console.log(this.message);
          this.signature = response.signature;
          this.timeStamp = response.timeStamp;
          const url = '/invoice-api/PB2CAPIVAN/Carrier/Aggregate';

          const body = new URLSearchParams();
          body.set('version', '1.0');
          body.set('serial', '0000000003');
          body.set('action', 'qryCarrierAgg');
          body.set('cardType', '3J0002');
          body.set('cardNo', this.username);
          body.set('cardEncrypt', this.password);
          body.set('timeStamp', this.timeStamp);
          console.log(this.timeStamp);
          body.set('uuid', '0004');
          body.set('appID', 'EINV7202407292089');
          body.set('signature', this.signature);

          const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
          });

          this.http.post(url, body.toString(), { headers })
            .subscribe(response => {
              this.responseData = response;
              this.isLoading = false;
              if (this.responseData.msg === "執行成功") {
                this.navigateToHome(); // 直接導航到首頁
              } else {
                this.errorMessage = '登入失敗: ' + this.responseData.msg;
              }
            }, error => {
              console.error('Error fetching invoice details:', error);
              this.isLoading = false;
              this.errorMessage = '獲取發票詳情時出錯，請稍後再試。';
            });
        },
        (error) => {
          console.error('Login error', error);
          this.isLoading = false;
          this.errorMessage = '登入時發生錯誤，請稍後再試。';
        }
      );
  }
}