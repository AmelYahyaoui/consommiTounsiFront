import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BarcodeResponse } from 'src/app/Models/BarcodeResponse';
import { Product } from '../../Models/Product';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public dataForm: FormGroup;
  listData: Product[];
  CodeAbarre: BarcodeResponse;

  productsURL = 'http://localhost:9091/SpringMVC/servlet/show-all-products';
  deleteProdUrl = 'http://localhost:9091/SpringMVC/servlet/remove-product/';
  addProdUrl = 'http://localhost:9091/SpringMVC/servlet/add-product';
  putProdUrl = 'http://localhost:9091/SpringMVC/servlet/update-Product/';
  getProductsByIdUrl = 'http://localhost:9091/SpringMVC/servlet/GetById/';
  GETBYID = ' http://localhost:9091/SpringMVC/servlet/prod/';
  getproductsByNameurl =
    'http://localhost:9091/SpringMVC/servlet/ShowAllByName/';
  zxingBarcodeUrl = 'http://localhost:9091/SpringMVC/servlet/zxing';

  constructor(private prodhttp: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.prodhttp.get<Product[]>(this.productsURL);
  }
  deleteProductById(id: number) {
    return this.prodhttp.delete(this.deleteProdUrl + id);
  }
  addProduct(product: Product, id: number) {
    return this.prodhttp.post(`${this.addProdUrl}/${id}`, product, {});
  }
  updateproduct(id: number, product: Product) {
    return this.prodhttp.put(this.putProdUrl + id, product);
  }
  getAllProductsByName(productName: string) {
    return this.prodhttp.get<Product>(this.getproductsByNameurl + productName);
  }
  getOneProductById(productId: number) {
    return this.prodhttp.get<Product>(this.getProductsByIdUrl + productId);
  }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest(
      'POST',
      '<Server URL of the file upload>',
      formdata,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );

    return this.prodhttp.request(req);
  }
  ZxingReader(file) {
    return this.prodhttp.post(this.zxingBarcodeUrl, file);
  }
}
