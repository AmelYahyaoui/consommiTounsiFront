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
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() id?: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  file: File;
  numberInitialViews: any;
  typesPublicity: any;
  underCategory: UnderCategory;
  codeForm: NgForm;
  options: any;
  value: Boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
