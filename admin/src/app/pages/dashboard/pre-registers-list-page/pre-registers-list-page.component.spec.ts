import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistersListPageComponent } from './pre-registers-list-page.component';

describe('PreRegistersListPageComponent', () => {
  let component: PreRegistersListPageComponent;
  let fixture: ComponentFixture<PreRegistersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRegistersListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreRegistersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
