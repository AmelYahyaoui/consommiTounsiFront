import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
//SERVICES
import { ProductService } from '../../Services/Product/product.service';
import { UnderCategoryService } from '../../Services/UnderCategory/undercategory.service';

//MODELS
import { Product } from '../../Models/Product';
import { UnderCategory } from '../../Models/UnderCategory';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Input() id?: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  file: File;
  product: Product;
  titleProduct: any;
  descriptionProduct: any;
  underCategories: Array<UnderCategory>;
  underCategory: UnderCategory;
  codeForm: NgForm;
  buyingPriceProduct: any;
  maxQuantityProduct: any;
  quantityProduct: any;
  priceProduct: any;
  weightProduct: any;
  underCategoryIdUnderCategory: any;
  value: Boolean;
  constructor(
    private router: Router,
    private prodSevice: ProductService,
    private underCategoryService: UnderCategoryService,
    private fb: FormBuilder
  ) {
    router.events.subscribe(() => {
      this.prodSevice
        .getOneProductById(Number(this.router.url.slice(19)))
        .subscribe(
          (res) => {
            this.product = res;
            console.log(this.product);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  ngOnInit(): void {
    console.log(this.router.url.slice(19));
    this.prodSevice
      .getOneProductById(Number(this.router.url.slice(19)))
      .subscribe(
        (res) => {
          this.product = res;
          console.log(this.product);
        },
        (err) => {
          console.log(err);
        }
      );
    this.underCategoryService.getAllUnderCat().subscribe(
      (res) => {
        this.underCategories = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.contactForm = this.fb.group({
      channelPublicity: [null],
      namePublicity: [null],
      targetPublicity: [null],
      initialViewNumber: [null],
      startDatePublicity: [null],
      endDatePublicity: [null],
      mailOwnerPublicity: [null],
      phoneOwnerPublicity: [null],
      fileName: [null],
      typePublicity: [null],
      descriptionPublicity: [null],
    });
  }
  editProduct() {
    console.log('ediiiiittttttt', this.product);
    /**  if (this.codeForm.value.fileName) {
      var startIndex =
        this.codeForm.value.fileName.indexOf('\\') >= 0
          ? this.codeForm.value.fileName.lastIndexOf('\\')
          : this.codeForm.value.fileName.lastIndexOf('/');
      var filename = this.codeForm.value.fileName.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.codeForm.value.fileName = filename;
    }*/
    console.log('ediiiiittttttt', this.product);
    this.prodSevice
      .updateproduct(this.product.idProduct, this.product)
      .subscribe((resp) => {
        console.log('after', resp);
        
        this.router.navigate(['/home/products']);
      });
  }
  redirectProduct() {
    this.router.navigate(['/home/products']);
  }
}
