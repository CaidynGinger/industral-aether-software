import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  private getRouterPath(params: string) {
    const sentence: string = params.split('/')[1].replace('-', ' ');
    const words = sentence.split(' ');
    return words
      .map((word) => {
        if (word) {
        return word[0].toUpperCase() + word.substring(1);
        }
        return ""
      })
      .join(' ');
  }
  constructor(private router: Router) {}

  pageTitle = this.getRouterPath(this.router.url);
}
