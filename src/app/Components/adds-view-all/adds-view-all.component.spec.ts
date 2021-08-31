import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsViewAllComponent } from './adds-view-all.component';

describe('AddsViewAllComponent', () => {
  let component: AddsViewAllComponent;
  let fixture: ComponentFixture<AddsViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
