import { Component, OnInit} from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductDialogComponent } from '../add-edit-product-dialog/add-edit-product-dialog.component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  constructor(private service: ApiserviceService, private dialog: MatDialog) { }

  productList: any = [];
  dialogTitle = "";
  ActivateAddEditPrdComp = true;
  productNameFilter = "";
  productListWithoutFilter: any = [];
  prd: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.prd = {
      productId: "0",
      productName: "",
      productPrice: "",
      productStock: "",

    }
    this.dialogTitle = "Add Product";
    //this.ActivateAddEditPrdComp = true;
  }

  openAddProductDialog() {
    this.dialog
    .open(AddEditProductDialogComponent, {
      width: '750px',
      data: {
        product: null,
        dialogTitle: "Add Product"
      }
    })
    .afterClosed()
    .subscribe((data: {product: Product}) => {
      alert(data.product.productName);
      this.refreshEmpList();
      //call ur api
       this.service.addProduct(data.product).subscribe(res => {
         alert(res.toString());
       });
    })
  }

  editProductDialog(item: Product) {
    this.refreshEmpList();
    console.log('updateAPI' +''+this.dialog)
    this.dialog
    .open(AddEditProductDialogComponent, {
      width: '750px',
      data: {
        product: item,
        dialogTitle: "Edit Product"
      }
    })
    .afterClosed()
    .subscribe((data: {product: Product}) => {
  
     alert('id '+data.product.productId +' name'+data.product.productName);
      //call ur api
      this.service.updateProduct(data.product).subscribe(res => {
        alert(res.toString());
        this.refreshEmpList();
       });
    })
  }



  deleteClick(item: any) {
    alert(item.productId.toString());
     if (confirm('Are you sure??')) {
       this.service.deleteProduct(item.productId).subscribe(data => {
         alert(data.toString());
         this.refreshEmpList();
       })
    }
  }

  closeClick() {
    //this.ActivateAddEditPrdComp = false;
    //this.closebuttonclicked.emit({ActivateAddEditPrdComp: false})
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getProductList().subscribe(data => {
      this.productList = data;
    });
  }

}
