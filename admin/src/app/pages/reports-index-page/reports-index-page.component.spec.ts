import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsIndexPageComponent } from './reports-index-page.component';

describe('ReportsIndexPageComponent', () => {
  let component: ReportsIndexPageComponent;
  let fixture: ComponentFixture<ReportsIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
