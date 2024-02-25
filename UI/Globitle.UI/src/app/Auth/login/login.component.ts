import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from 'src/app/Models/Login-request.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model?: LoginRequest | undefined;

  constructor(private authService: AuthService, private alertService: AlertService,
    private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }
  ngOnInit(): void {
    localStorage.setItem("language", 'en');
  }
  onFormSubmit(): void {
    if (this.model)
      this.authService.login(this.model).subscribe({
        next: (response) => {
          this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
          //set user 
          this.authService.setUser({
            email: response.email,
            roles: response.roles,
            companyId: response.companyId
          });
          //redirect to home page 
          debugger
          if (this.authService.getUser()?.roles.includes('Admin')) {
            this.router.navigateByUrl('/admin/home');
          } else {
            this.router.navigateByUrl('/suggestion');
          }

        },
        error: (response) => {
          this.alertService.showAlertMessage('Error', response.error, 'Error');

        }
      })
  }
}
