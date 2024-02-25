import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsectorComponent } from './addsector.component';

describe('AddsectorComponent', () => {
  let component: AddsectorComponent;
  let fixture: ComponentFixture<AddsectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsectorComponent]
    });
    fixture = TestBed.createComponent(AddsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
