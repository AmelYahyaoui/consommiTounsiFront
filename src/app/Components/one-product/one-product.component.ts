import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Models
import { Product } from '../../Models/Product';
// Services
import { ProductService } from '../../Services/Product/product.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css'],
})
export class OneProductComponent implements OnInit {
  constructor(private router: Router, private prodService: ProductService) {
    router.events.subscribe(() => {
      this.prodService
        .getOneProductById(Number(this.router.url.slice(18)))
        .subscribe(
          (res) => {
            this.product = res;
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  product: Product;
  ngOnInit(): void {
    this.prodService
      .getOneProductById(Number(this.router.url.slice(18)))
      .subscribe(
        (res) => {
          this.product = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
