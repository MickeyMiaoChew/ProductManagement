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

  productList: Product[] = [];
  dialogTitle = "";
  ActivateAddEditPrdComp = true;
  productNameFilter = "";

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
      //alert(data.product.productName);

       this.service.addProduct(data.product).subscribe(res => {
         alert(res.message);
         this.refreshEmpList();
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
  
     //alert('id '+data.product.productId);
      this.service.updateProduct(data.product).subscribe(res => {
        console.log(res);
        alert(res.message);
        this.refreshEmpList();
       });
    })
  }



  deleteClick(item: Product) {
    //alert(item.productId.toString());
     if (confirm('Are you sure??')) {
       this.service.deleteProduct(item.productId).subscribe(data => {
        if(data.toString() =="true")
        {
          alert(item.productName+ " Delete Successful");
          this.refreshEmpList();
        }
       })
    }
  }

 
  refreshEmpList() {
    this.service.getProductList().subscribe(response => {
      this.productList = response.data;
      console.log('productList', response.message)
    });
  }

}
