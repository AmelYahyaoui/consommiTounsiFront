import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  routeName: any;
  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.routeName = this.router.url;
    });
  }

  ngOnInit(): void {
    this.routeName = this.router.url;
  }
}
