import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
//SERVICES
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';
//MODELS
import { UnderCategory } from '../../Models/UnderCategory';
import { CategoryService } from '../../Services/Category/category.service';
//MODELS
import { Category } from '../../Models/Category';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-under-category',
  templateUrl: './edit-under-category.component.html',
  styleUrls: ['./edit-under-category.component.css'],
})
export class EditUnderCategoryComponent implements OnInit {
  @Input() id?: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  cibles: any;
  channels: any;
  file: File;
  numberInitialViews: any;
  typesPublicity: any;
  underCategory: UnderCategory;
  codeForm: NgForm;
  options: any;
  value: Boolean;
  categories: Array<Category>;

  constructor(
    private router: Router,
    private underCategService: UnderCategoryService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    router.events.subscribe(() => {
      this.underCategService
        .getUnderCatById(Number(this.router.url.slice(26)))
        .subscribe(
          (res) => {
            this.underCategory = res;
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  ngOnInit(): void {
    this.underCategService
      .getUnderCatById(Number(this.router.url.slice(26)))
      .subscribe(
        (res) => {
          this.underCategory = res;
        },
        (err) => {
          console.log(err);
        }
      );

    this.categoryService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  redirectUnderCategory() {
    this.router.navigate(['/home/underCategories']);
  }
  editUnderCategory() {
    console.log(this.underCategory);
    this.underCategService
      .updateUnderCategory(
        this.underCategory.idUnderCategory,
        this.underCategory
      )
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/home/undercategories']);
      });
  }
}
