import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByteUserListComponent } from './byte-user-list.component';

describe('ByteUserListComponent', () => {
  let component: ByteUserListComponent;
  let fixture: ComponentFixture<ByteUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByteUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByteUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
