import { Component, OnInit, ViewChild } from '@angular/core';
//SERVICES
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';
//MODELS
import { UnderCategory } from '../../Models/UnderCategory';
import { CategoryService } from '../../Services/Category/category.service';
//MODELS
import { Category } from '../../Models/Category';
import { NgForm,FormBuilder,FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-uder-category-admin',
  templateUrl: './uder-category-admin.component.html',
  styleUrls: ['./uder-category-admin.component.css'],
})
export class UderCategoryAdminComponent implements OnInit {
  undercategories: Array<UnderCategory>;
  underCategory: UnderCategory = new UnderCategory;
  categories: Array<Category>;
  show:Boolean;
  @ViewChild('codeForm') codeForm: NgForm;
  @ViewChild('codeForm2') codeForm2: NgForm;
  contactForm:FormGroup;
  constructor(
    private underCategService: UnderCategoryService,
    private categoryService: CategoryService,private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      category: [null],
      nameUnderCategory: [null]
    });
    this.show = false;
    
    this.underCategService.getAllUnderCat().subscribe(
      (res) => {
        this.undercategories = res;
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

  onChange(value) {
    this.underCategory.category = value
  }
 //addUnderCategory 
  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value.category)
    this.underCategory.nameUnderCategory = this.contactForm.value.nameUnderCategory
    console.log(this.underCategory.nameUnderCategory)
    this.underCategService.addUndercategory(this.underCategory,this.contactForm.value.category).subscribe(() =>
      this.underCategService.getAllUnderCat().subscribe((res) => {
        this.undercategories = res;
        this.show = true
      })
    );
  }

  toggelToast(){
    this.show = false
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  //delete uNDERcATEGORY
  deleteUnderCategory(underCategory) {
    Swal.fire({
      icon: 'warning',
      title: 'Supprimer cette sous-catégorie',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.underCategService
          .DeleteUnderCat(underCategory.idUnderCategory)
          .subscribe(() =>
            this.underCategService.getAllUnderCat().subscribe((res) => {
              this.undercategories = res;
            })
          );
      } else if (result.isDismissed) {
        this.swalWithBootstrapButtons.fire(
          'Annulé',
          'Opération annulée',
          'error'
        );
      }
    });
  }
}
