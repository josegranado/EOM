import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerListPageComponent } from './broker-list-page.component';

describe('BrokerListPageComponent', () => {
  let component: BrokerListPageComponent;
  let fixture: ComponentFixture<BrokerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
