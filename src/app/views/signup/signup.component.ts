import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private readonly starsCount = 5;
  public readonly reviewsCount = 200;
  public starsArray: number[] = [];
  public isValid: boolean = false;

  public readonly imagesArray: string[] = [
    "https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg",
    "https://t3.ftcdn.net/jpg/02/33/46/24/360_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg",
    "https://t4.ftcdn.net/jpg/02/60/78/83/360_F_260788352_x5sSHM4DGvpjHj9wz8sFltzAPktQwJCj.jpg",
    "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-woman-shirt-white-background-131683029.jpg",
    "https://www.auramarine.com/wp-content/uploads/2018/03/man-placeholder-e1520494457998.png",
  ];

  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.initStarSize();
    this.initValidObs();
  }

  private initStarSize() {
    for (let i = 0; i < this.starsCount; i++) {
      this.starsArray.push(i);
    }
  }

  private initValidObs() {
    let nameValid = false;
    let emailValid = false;
    let passwordValid = false;
    this.nameFormControl.valueChanges.subscribe(e => {
      nameValid = this.nameFormControl.valid;
      this.isValid = nameValid && emailValid && passwordValid;
    });
    this.emailFormControl.valueChanges.subscribe(e => {
      emailValid = this.emailFormControl.valid;
      this.isValid = nameValid && emailValid && passwordValid;
    });
    this.passwordFormControl.valueChanges.subscribe(e => {
      passwordValid = this.passwordFormControl.valid;
      this.isValid = nameValid && emailValid && passwordValid;
    });
  }

  public getLeftPosition(index: number) {
    return `${index * 30}px`;
  }

  public onSubmit() {
    if (this.nameFormControl.value && this.emailFormControl.value && this.passwordFormControl.value) {
      this.auth.register(this.emailFormControl.value, this.passwordFormControl.value);
    }
  }

  public googleSignIn() {
    this.auth.googleSignIn();
  }
}
