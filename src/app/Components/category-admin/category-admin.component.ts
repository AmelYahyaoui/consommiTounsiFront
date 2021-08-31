import { Component, OnInit, ViewChild } from '@angular/core';
//SERVICES
import { CategoryService } from '../../Services/Category/category.service';
//MODELS
import { Category } from '../../Models/Category';

import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css'],
})
export class CategoryAdminComponent implements OnInit {
  categories: Array<Category>;
  category: Category;
  edit: Boolean;
  modal: Boolean;

  @ViewChild('codeForm') codeForm: NgForm;
  @ViewChild('codeForm2') codeForm2: NgForm;
  constructor(private categService: CategoryService) {}

  ngOnInit(): void {
    this.edit = false;
    this.modal = false;
    this.categService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //add category
  addCategory() {
    this.categService.addCategory(this.codeForm.value).subscribe(() =>
      this.categService.getAllCategories().subscribe((res) => {
        this.categories = res;
      })
    );
  }
  //swal notification popup
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  //delete category
  deleteCategory(category) {
    Swal.fire({
      icon: 'warning',
      title: 'Supprimer cette catégorie',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categService
          .deleteCategoryById(category.idCategory)
          .subscribe(() =>
            this.categService.getAllCategories().subscribe((res) => {
              this.categories = res;
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
  //set category
  setCategory(category) {
    this.category = category;
    this.edit = true;
  }

  //edit Category
  editCategory() {
    this.category.nameCategory = this.codeForm2.value.nameCategory;
    this.categService
      .updateCategory(this.category.idCategory, this.category)
      .subscribe(() => {
        this.category = null;
        this.edit = false;
        this.categService.getAllCategories().subscribe((res) => {
          this.categories = res;
        });
      });
  }
}
