import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  constructor(private service: ApiserviceService) { }

  productList: any = [];
  ModalTitle = "";
  ActivateAddEditPrdComp: boolean = false;
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
    this.ModalTitle = "Add Product";
    this.ActivateAddEditPrdComp = true;
  }

  editClick(item: any) {
    this.prd = item;
    this.ModalTitle = "Edit Product";
    this.ActivateAddEditPrdComp = true;
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
    this.ActivateAddEditPrdComp = false;
    //this.closebuttonclicked.emit({ActivateAddEditPrdComp: false})
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getProductList().subscribe(data => {
      this.productList = data;
    });
  }
childPressClicked(){
  this.ActivateAddEditPrdComp = false;
}
  


}
