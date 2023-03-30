import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsMembersListPageComponent } from './credits-members-list-page.component';

describe('CreditsMembersListPageComponent', () => {
  let component: CreditsMembersListPageComponent;
  let fixture: ComponentFixture<CreditsMembersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsMembersListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsMembersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
