import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListPageComponent } from './posts-list-page.component';

describe('PostsListPageComponent', () => {
  let component: PostsListPageComponent;
  let fixture: ComponentFixture<PostsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
