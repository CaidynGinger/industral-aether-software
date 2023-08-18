import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(
    private readonly router: Router,
  ) {}

  public storedData: object | any = {};
  public username: string = '';


  ngOnInit() {
    this.storedData = localStorage.getItem('user');
    if (!this.storedData) {
      this.router.navigate(['/login']);
    }    
    this.username = JSON.parse(this.storedData).username;
  }

  logoutHandler() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
