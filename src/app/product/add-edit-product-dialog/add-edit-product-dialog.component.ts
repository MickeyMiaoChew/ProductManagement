import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

export interface dialogData {
  product: Product;
  dialogTitle: string;
}

@Component({
  selector: 'app-add-edit-product-dialog',
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrls: ['./add-edit-product-dialog.component.css']
})
export class AddEditProductDialogComponent implements OnInit {
  formGroup!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    price: FormControl<number>;
    stock: FormControl<number>;
  }>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    public dialogRef: MatDialogRef<AddEditProductDialogComponent>,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required ,Validators.maxLength(50)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      price: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0)]),
      stock: this.fb.nonNullable.control(0, Validators.required),
    });

    //if got data pass in from parent means it's edit mode so we pass the values to the form
    if(this.data.product) {
      this.formGroup.controls.name.patchValue(this.data.product.name);
      this.formGroup.controls.description.patchValue(this.data.product.description);
      this.formGroup.controls.price.patchValue(this.data.product.price);
      this.formGroup.controls.stock.patchValue(this.data.product.stock);
    }
  }

  onCreateOrUpdate() {
    this.dialogRef.close({product: this.formGroup.getRawValue()})
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
