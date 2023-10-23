import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishOfferComponent } from './publish-offer.component';

describe('PublishOfferComponent', () => {
  let component: PublishOfferComponent;
  let fixture: ComponentFixture<PublishOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
