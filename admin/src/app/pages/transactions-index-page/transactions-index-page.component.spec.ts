import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsIndexPageComponent } from './transactions-index-page.component';

describe('TransactionsIndexPageComponent', () => {
  let component: TransactionsIndexPageComponent;
  let fixture: ComponentFixture<TransactionsIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
