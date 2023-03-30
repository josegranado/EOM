import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditIndexPageComponent } from './credit-index-page.component';

describe('CreditIndexPageComponent', () => {
  let component: CreditIndexPageComponent;
  let fixture: ComponentFixture<CreditIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
