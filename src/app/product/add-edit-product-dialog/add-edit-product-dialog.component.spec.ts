import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductDialogComponent } from './add-edit-product-dialog.component';

describe('AddEditDialogComponent', () => {
  let component: AddEditProductDialogComponent;
  let fixture: ComponentFixture<AddEditProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProductDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
