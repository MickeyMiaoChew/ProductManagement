import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShowProductComponent } from '../../product/show-product/show-product.component';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
@NgModule({
  declarations: [ShowProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddEditProductComponent

  ],
  exports: [ShowProductComponent],
})
export class ShowProductModule {}