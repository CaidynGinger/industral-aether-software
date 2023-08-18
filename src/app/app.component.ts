import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'industral-aether-software';

  constructor(
    private readonly router: Router,
  ) { }

  public storedData: object | any = localStorage.getItem('user');

  ngOnInit() {
    this.storedData = localStorage.getItem('user');
    if (!this.storedData) {
      this.router.navigate(['/login']);
    }
  }

}
