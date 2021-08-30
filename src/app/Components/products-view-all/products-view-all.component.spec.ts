import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewAllComponent } from './products-view-all.component';

describe('ProductsViewAllComponent', () => {
  let component: ProductsViewAllComponent;
  let fixture: ComponentFixture<ProductsViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
