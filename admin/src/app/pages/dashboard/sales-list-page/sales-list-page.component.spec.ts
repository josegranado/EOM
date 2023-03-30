import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesListPageComponent } from './sales-list-page.component';

describe('SalesListPageComponent', () => {
  let component: SalesListPageComponent;
  let fixture: ComponentFixture<SalesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
