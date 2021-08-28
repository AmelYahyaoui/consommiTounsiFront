import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityAdminComponent } from './publicity-admin.component';

describe('PublicityAdminComponent', () => {
  let component: PublicityAdminComponent;
  let fixture: ComponentFixture<PublicityAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicityAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
