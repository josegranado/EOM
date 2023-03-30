import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersIndexPageComponent } from './registers-index-page.component';

describe('RegistersIndexPageComponent', () => {
  let component: RegistersIndexPageComponent;
  let fixture: ComponentFixture<RegistersIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistersIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistersIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
