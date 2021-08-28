import { Component, OnInit } from '@angular/core';
//Models
import { Category } from '../../Models/Category';
import { Product } from '../../Models/Product';
import { Publicity } from '../../Models/Publicity';
import { UnderCategory } from '../../Models/UnderCategory';
// Services
import { ProductService } from '../../Services/Product/product.service';
import { CategoryService } from '../../Services/Category/category.service';
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';
import { AdsService } from '../../Services/Publicity/publicity.service';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.css'],
})
export class HomeLandingComponent implements OnInit {
  categories: Array<Category>;
  products: Array<Product>;
  undercategories: Array<UnderCategory>;
  publicity: Array<Publicity>;

  constructor(
    private prodService: ProductService,
    private categService: CategoryService,
    private underCategService: UnderCategoryService,
    private adService: AdsService
  ) {}

  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.categService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.underCategService.getAllUnderCat().subscribe(
      (res) => {
        this.undercategories = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.adService.getAllPublicities().subscribe(
      (res) => {
        this.publicity = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
