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
  file_upload: object;
  tunisianBarCodeCheck: string;
  tunisianBarCode: boolean;
  barcode: any;
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
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      let body = new FormData();
      body.append('file', this.file);
      this.prodService.ZxingReader(body).subscribe((res) => {
        console.log(res)
        if (Array.isArray(res['results'])) {
          this.file_upload = res['results'][0].toString();
          var arr = this.file_upload.toString().split('');
          this.tunisianBarCodeCheck = arr.slice(0, 3).join('');
          this.tunisianBarCode = this.tunisianBarCodeCheck == '857';
          this.barcode = res['results'][0].toString();

          console.log('hereee', this.contactForm.value.barcodeProduct);
        } else {
          this.tunisianBarCode = false;
        }
        if (!this.tunisianBarCode) {
          alert(
            `Votre produit n'est pas Tunisien. \n Veuillez insérer un produit Tunisien`
          );
        }
      });
    }
  }
  resetForm() {
    this.tunisianBarCodeCheck = null;
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
  }
  //addProduct
  submit() {
    console.log(this.contactForm.value.barcodeProduct);
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
    this.contactForm.value.barcodeProduct = this.barcode;
    console.log(this.contactForm.value);
    this.prodService
      .addProduct(
        this.contactForm.value,
        this.contactForm.value.underCategoryIdUnderCategory
      )
      .subscribe(() =>
        this.prodService.getAllProducts().subscribe((res) => {
          this.products = res;
          this.resetForm();
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
          'Annuler',
          'Opération Annulere',
          'error'
        );
      }
    });
  }

  //barCodeReader
  checkBareCode() {}
}
