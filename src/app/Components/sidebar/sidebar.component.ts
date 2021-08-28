import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  routeName: String;
  categories: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routeName = this.router.url;
    this.categories = [
      {
        category: 'Men',
        underCategories: [
          {
            underCategory: 'T-shirt',
            products: [
              { name: 'Nike Airmax', size: 'M', price: '50', color: 'red' },
              { name: 'Adidas', size: 'M', price: '30', color: 'red' },
            ],
          },
          {
            underCategory: 'Pants',
            products: [
              { name: 'Adidas', price: '80', size: '2', color: 'red' },
            ],
          },
        ],
      },
      {
        category: 'Women',
        underCategories: [
          {
            underCategory: 'T-shirt',
            products: [{ name: 'Nike', price: '120', size: 'M', color: 'red' }],
          },
        ],
      },
    ];
  }
}
