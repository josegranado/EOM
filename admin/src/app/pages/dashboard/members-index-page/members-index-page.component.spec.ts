import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersIndexPageComponent } from './members-index-page.component';

describe('MembersIndexPageComponent', () => {
  let component: MembersIndexPageComponent;
  let fixture: ComponentFixture<MembersIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
