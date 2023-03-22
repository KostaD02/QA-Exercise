import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  private isClicked = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.isClicked) {
        this.gotoHome();
      }
    }, 20000);
  }


  gotoHome() {
    this.isClicked = true;
    this.router.navigateByUrl('/');
  }
}
