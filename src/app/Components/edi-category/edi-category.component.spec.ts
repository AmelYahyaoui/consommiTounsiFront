import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCategoryComponent } from './edi-category.component';

describe('EdiCategoryComponent', () => {
  let component: EdiCategoryComponent;
  let fixture: ComponentFixture<EdiCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdiCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
