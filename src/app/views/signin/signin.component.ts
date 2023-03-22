import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }


  public onSubmit() {
    this.auth.login(this.email, this.password);
  }

  public googleSignIn() {
    this.auth.googleSignIn();
  }
}
