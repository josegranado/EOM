import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinsPageComponent } from './twins-page.component';

describe('TwinsPageComponent', () => {
  let component: TwinsPageComponent;
  let fixture: ComponentFixture<TwinsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwinsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
