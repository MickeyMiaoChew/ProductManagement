import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter<boolean>();;
  constructor(private service: ApiserviceService) { }
  ProductList: any = [];
  @Input() prd: any;
  productId = "";
  productName = "";
  productDescription = "";
  productPrice = "";
  productStock = "";
  productIdFilter = "";
  productNameFilter = "";
  productListWithoutFilter: any = [];

  ngOnInit(): void {
    this.productId = this.prd.productId;
    this.productName = this.prd.productName;
    this.productDescription = this.prd.productDescription;
    this.productPrice = this.prd.productPrice;
    this.productStock = this.prd.productStock;
  }


  addProduct() {
    var val = {
      productId : this.productId,
      productName : this.productName,
      productDescription : this.productDescription,
      productPrice : this.productPrice,
      productStock : this.productStock
    };
    this.service.addProduct(val).subscribe(res => {
      alert(res.toString());
    });
  }

    updateProduct() {
      var prd = {
          productId : this.productId,
          productName : this.productName,
          productDescription : this.productDescription,
          productPrice : this.productPrice,
          productStock : this.productStock
      };
      this.service.updateProduct(prd).subscribe(res => {
        alert(res.toString());
      });
      this.closeButtonClicked.emit(false);
    }

    

    refreshPrdList() {
      this.service.getProductList().subscribe(data => {
        this.ProductList = data;
        this.productListWithoutFilter = data;
      });
    }
  
}



