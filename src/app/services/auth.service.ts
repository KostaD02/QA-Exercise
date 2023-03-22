import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private sweetAlert: SweetAlertService) { }

  public login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      sessionStorage.setItem('token', res.user!.uid);
      if (res.user?.emailVerified) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/verify-email/info');
      }
    }, err => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
      this.router.navigateByUrl('/sign-in');
    });
  }

  public register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.sendEmailForVerification(res.user);
    }, err => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
      this.router.navigateByUrl('/sign-up');
    });
  }

  public logOut() {
    this.fireauth.signOut().then(() => {
      sessionStorage.removeItem('token');
      this.router.navigateByUrl('/sign-in');
    }, err => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
    })
  }

  public forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigateByUrl('/verify-email/info');
    }, err => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
    });
  }

  public sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(() => {
      this.router.navigateByUrl('/verify-email/info');
    }, (err: any) => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
    });
  }

  public googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.router.navigateByUrl('/');
      sessionStorage.setItem('token', res.user!.uid);
    }, err => {
      this.sweetAlert.displayModal('error', err, 'Check console');
      console.log(err);
    });
  }

  public isUserAuth() {
    return sessionStorage.getItem('token')?.length === 28;
  }

  public getCurrentUser() {
    return this.fireauth.authState;
  }
}
