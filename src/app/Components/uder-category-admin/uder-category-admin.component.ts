import { Component, OnInit } from '@angular/core';
//SERVICES
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';
//MODELS
import { UnderCategory } from '../../Models/UnderCategory';
@Component({
  selector: 'app-uder-category-admin',
  templateUrl: './uder-category-admin.component.html',
  styleUrls: ['./uder-category-admin.component.css'],
})
export class UderCategoryAdminComponent implements OnInit {
  undercategories: Array<UnderCategory>;
  constructor(private underCategService: UnderCategoryService) {}

  ngOnInit(): void {
    this.underCategService.getAllUnderCat().subscribe(
      (res) => {
        this.undercategories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
