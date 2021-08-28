import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  routeName: String;
  categories: Array<Category>;
  products: Array<Product>;
  undercategories: Array<UnderCategory>;
  publicity: Array<Publicity>;
  sidebar: any;
  constructor(
    private router: Router,
    private prodService: ProductService,
    private categService: CategoryService,
    private underCategService: UnderCategoryService,
    private adService: AdsService
  ) {}
  rightType(array, category) {
    var test = null;
    array.forEach((element) => {
      if (
        category.nameCategory.toLowerCase() == element.category.toLowerCase()
      ) {
        test = true;
      }
    });
    return test;
  }
  fixUnderCategory(array, category, underCategory, products) {
    array.forEach((element) => {
      if (
        element.category.toLowerCase() == category.nameCategory.toLowerCase()
      ) {
        element.underCategories.forEach((element2) => {
          if (
            element2.underCategory.nameUnderCategory.toLowerCase() ==
            underCategory.nameUnderCategory.toLowerCase()
          ) {
            element2.products.push(...products);
          }
        });
      }
    });
    return array;
  }
  ngOnInit() {
    this.routeName = this.router.url;
    this.underCategService.getAllUnderCat().subscribe(
      (res) => {
        this.undercategories = res;
        var final = [];
        for (var i = 0; i < this.undercategories.length; i++) {
          var underCategory = this.undercategories[i];
          var category = this.undercategories[i].category;

          if (this.rightType(final, category) == null) {
            final.push({
              category: category.nameCategory,
              underCategories: [{ underCategory, products: [] }],
            });
          }
          this.underCategService
            .getProdsByIdUnderCat(this.undercategories[i].idUnderCategory)
            .subscribe(
              (res: Array<Product>) => {
                if (res.length) {
                  final = this.fixUnderCategory(
                    final,
                    res[0].underCategory.category,
                    res[0].underCategory,
                    res
                  );
                }

                this.sidebar = final;
              },
              (err) => {
                console.log(err);
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
