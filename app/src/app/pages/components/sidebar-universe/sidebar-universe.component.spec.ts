import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUniverseComponent } from './sidebar-universe.component';

describe('SidebarUniverseComponent', () => {
  let component: SidebarUniverseComponent;
  let fixture: ComponentFixture<SidebarUniverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUniverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUniverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
