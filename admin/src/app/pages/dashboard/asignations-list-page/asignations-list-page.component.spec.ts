import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationsListPageComponent } from './asignations-list-page.component';

describe('AsignationsListPageComponent', () => {
  let component: AsignationsListPageComponent;
  let fixture: ComponentFixture<AsignationsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignationsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignationsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
