import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditByteUserComponent } from './edit-byte-user.component';

describe('EditByteUserComponent', () => {
  let component: EditByteUserComponent;
  let fixture: ComponentFixture<EditByteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditByteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditByteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
