import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicityComponent } from './edit-publicity.component';

describe('EditPublicityComponent', () => {
  let component: EditPublicityComponent;
  let fixture: ComponentFixture<EditPublicityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPublicityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
