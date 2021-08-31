import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnderCategoryComponent } from './edit-under-category.component';

describe('EditUnderCategoryComponent', () => {
  let component: EditUnderCategoryComponent;
  let fixture: ComponentFixture<EditUnderCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnderCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnderCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
