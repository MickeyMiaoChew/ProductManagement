import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ApiserviceService } from 'src/app/apiservice.service';

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
    // productId: FormControl<string>;
    productName: FormControl<string>;
    productDescription: FormControl<string>;
    productPrice: FormControl<number>;
    productStock: FormControl<number>;
  }>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    public dialogRef: MatDialogRef<AddEditProductDialogComponent>,
    private service: ApiserviceService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('dialog data:' ,this.data);
    this.formGroup = this.fb.group({
      // productId:this.fb.nonNullable.control('', [Validators.required ,Validators.maxLength(50)]),
      productName: this.fb.nonNullable.control('', [Validators.required ,Validators.maxLength(50)]),
      productDescription: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      productPrice: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0)]),
      productStock: this.fb.nonNullable.control(0, Validators.required),
    });
     
    //if got data pass in from parent means it's edit mode so we pass the values to the form
    if(this.data.product) {
      console.log('data'+this.data.product.productName +'ID'+this.data.product.productId)
    //  this.formGroup.controls.productId.patchValue(this.data.product.productId);
      this.formGroup.controls.productName.patchValue(this.data.product.productName);
      this.formGroup.controls.productDescription.patchValue(this.data.product.productDescription);
      this.formGroup.controls.productPrice.patchValue(this.data.product.productPrice);
      this.formGroup.controls.productStock.patchValue(this.data.product.productStock);
    }
  }


  onCreateOrUpdate() {
    //this.dialogRef.close({product: this.formGroup.getRawValue()})
    if (this.data.dialogTitle === 'Add Product') {
      // For Create action
      this.dialogRef.close({ product: this.formGroup.getRawValue() });
    } else if (this.data.dialogTitle === 'Edit Product') {
      // For Edit action
      const updatedProduct = { ...this.formGroup.getRawValue(), productId: this.data.product.productId };
      this.dialogRef.close({ product: updatedProduct });
    }

  }

  onCancel() {
    this.dialogRef.close(null);
  }
  
}
