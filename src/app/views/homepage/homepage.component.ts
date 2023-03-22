import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  user = this.auth.getCurrentUser();

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user.subscribe(res => {
      if (!res?.emailVerified) {
        this.router.navigateByUrl('/verify-email/info');
      }
    });
  }

  logOut() {
    this.auth.logOut();
  }

}
