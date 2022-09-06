import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishProductPageComponent } from './publish-product-page.component';

describe('PublishProductPageComponent', () => {
  let component: PublishProductPageComponent;
  let fixture: ComponentFixture<PublishProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
