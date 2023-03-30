import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtsListPageComponent } from './boughts-list-page.component';

describe('BoughtsListPageComponent', () => {
  let component: BoughtsListPageComponent;
  let fixture: ComponentFixture<BoughtsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
