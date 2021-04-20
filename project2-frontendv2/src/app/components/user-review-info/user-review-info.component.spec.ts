import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewInfoComponent } from './user-review-info.component';

describe('UserReviewInfoComponent', () => {
  let component: UserReviewInfoComponent;
  let fixture: ComponentFixture<UserReviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReviewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
