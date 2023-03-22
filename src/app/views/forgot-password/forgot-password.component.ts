import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public email: string = "";

  constructor(private auth: AuthService) { }

  public onSubmit() {
    this.auth.forgotPassword(this.email);
  }

}
