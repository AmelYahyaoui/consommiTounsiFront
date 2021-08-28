import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UderCategoryAdminComponent } from './uder-category-admin.component';

describe('UderCategoryAdminComponent', () => {
  let component: UderCategoryAdminComponent;
  let fixture: ComponentFixture<UderCategoryAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UderCategoryAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UderCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
