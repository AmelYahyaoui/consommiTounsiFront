import { Component, OnInit } from '@angular/core';
//SERVICES
import { ProductService } from '../../Services/Product/product.service';
//MODELS
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements OnInit {
  products: Array<Product>;
  constructor(private prodService: ProductService) {}

  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
