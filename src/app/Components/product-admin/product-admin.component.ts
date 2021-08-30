import { Component, OnInit } from '@angular/core';

import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
//SERVICES
import { ProductService } from '../../Services/Product/product.service';
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';

//MODELS
import { Product } from '../../Models/Product';
import { UnderCategory } from '../../Models/UnderCategory';
import { CategoryService } from '../../Services/Category/category.service';
import { Category } from '../../Models/Category';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements OnInit {
  products: Array<Product>;
  undercategories: Array<UnderCategory>;
  contactForm: FormGroup;
  file: File;
  
  constructor(
    private prodService: ProductService,
    private underCategoryService: UnderCategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      underCategoryIdUnderCategory: [null],
      titleProduct: [null],
      descriptionProduct: [null],
      barcodeProduct: [null],
      buyingPriceProduct: [null],
      maxQuantityProduct: [null],
      priceProduct: [null],
      quantityProduct: [null],
      weightProduct: [null],
      fileName: [null],
    });
    this.prodService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.underCategoryService.getAllUnderCat().subscribe(
      (res) => {
        this.undercategories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fileChange(event: any) {
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
    }
  }
  //addProduct
  submit() {
    if (this.contactForm.value.fileName) {
      var startIndex =
        this.contactForm.value.fileName.indexOf('\\') >= 0
          ? this.contactForm.value.fileName.lastIndexOf('\\')
          : this.contactForm.value.fileName.lastIndexOf('/');
      var filename = this.contactForm.value.fileName.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.contactForm.value.fileName = filename;
    }
    console.log(this.contactForm.value);
    this.prodService
      .addProduct(
        this.contactForm.value,
        this.contactForm.value.underCategoryIdUnderCategory
      )
      .subscribe(() =>
        this.prodService.getAllProducts().subscribe((res) => {
          this.products = res;
        })
      );
  }
  //deleteProduct
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  deleteProduct(product) {
    Swal.fire({
      icon: 'warning',
      title: `Supprimer cet produit ! : ${product.titleProduct}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodService.deleteProductById(product.idProduct).subscribe(() =>
          this.prodService.getAllProducts().subscribe((res) => {
            this.products = res;
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
