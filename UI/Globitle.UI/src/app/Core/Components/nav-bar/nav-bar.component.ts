import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User | undefined;
  myLang: string;
  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) {

    if (localStorage.getItem("language") && localStorage.getItem("language") != 'null' && localStorage.getItem("language") != '') {

      this.myLang = localStorage.getItem("language") ?? '';

    }
    else {
      this.myLang = "ar";
    }

    localStorage.setItem("language", this.myLang);
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage !== null) {
      this.translateService.use(storedLanguage);
    }
  }
  ngOnInit(): void {
    this.authService.User().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  translate(event: any) {
    localStorage.setItem('language', event.target.value);
    window.location.reload();
  }

}
