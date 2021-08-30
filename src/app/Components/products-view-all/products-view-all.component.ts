import { Component, OnInit } from '@angular/core';

//SERVICES
import { ProductService } from '../../Services/Product/product.service';

//MODELS
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-products-view-all',
  templateUrl: './products-view-all.component.html',
  styleUrls: ['./products-view-all.component.css'],
})
export class ProductsViewAllComponent implements OnInit {
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
