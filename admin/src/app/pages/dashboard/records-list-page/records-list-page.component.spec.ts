import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsListPageComponent } from './records-list-page.component';

describe('RecordsListPageComponent', () => {
  let component: RecordsListPageComponent;
  let fixture: ComponentFixture<RecordsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
