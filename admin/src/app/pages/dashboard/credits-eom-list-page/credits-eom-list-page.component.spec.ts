import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsEomListPageComponent } from './credits-eom-list-page.component';

describe('CreditsEomListPageComponent', () => {
  let component: CreditsEomListPageComponent;
  let fixture: ComponentFixture<CreditsEomListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsEomListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsEomListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
