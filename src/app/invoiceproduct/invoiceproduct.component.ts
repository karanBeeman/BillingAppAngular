import { HttpClient } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TitleStrategy } from '@angular/router';
import { InoviceBillService } from '../shared/inovice-bill.service';
import { InvoiceDataService } from '../shared/invoice-data.service';

export interface ProductData {
  
  Product: string;
  Stock: number;
}

class tempProduct {
  constructor(Product:any, Stock: any) {
    Product = Product;
    Stock = Stock;
  }
 
}


@Component({
  selector: 'app-invoiceproduct',
  templateUrl: './invoiceproduct.component.html',
  styleUrls: ['./invoiceproduct.component.css']
})
export class InvoiceproductComponent implements OnInit {

  
  displayedColumns: string[] = ['Product', 'Stock'];
  dataSource = new MatTableDataSource<any>();
   datasourceCopy: any;
   datasoruceC: any;
  ProductData : any;
  ProductForm!: FormGroup;
  upadtedProductsList = [];
  
  @Output() productObj = new EventEmitter<ProductData>()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  value: any;
  
  constructor( private fb: FormBuilder, private httpClient: HttpClient, private _formBuilder: FormBuilder, 
    private invoiceProduct : InvoiceDataService, private invoiceBillService: InoviceBillService) { }

  ngOnInit(): void {
    this.ProductForm = this._formBuilder.group({
      productDetails: this._formBuilder.array([])
    });

    this.invoiceBillService.getStockDetails()
      .subscribe((res) => {
      this.ProductData = res;
      console.log(this.ProductData);
      this.dataSource.data = this.ProductData;
       this.datasoruceC = JSON.stringify(res);
       this.datasourceCopy = JSON.parse(this.datasoruceC);
      this.dataSource.paginator = this.paginator;
        })

       this.stockSubscribe();
       this.stockUpdateOnDeleteProduct();
  }

  onAddProduct(product: any){
  
    this.invoiceProduct.invoiceData.next(product);
    this.productObj.emit(product);
    this.stockSubscribe();
    
  }
  stockUpdateOnDeleteProduct() {
    this.invoiceProduct.stockUpdateOnDelete.subscribe((productqty : FormGroup) => {
      if(productqty) {
        console.log('entere inot stockUpdaeonDelete')
        let rawData = productqty.getRawValue();
        console.log("rawData", productqty)
        for(let i=0; i< this.datasourceCopy.length; i++) {
               if((this.datasourceCopy[i].productName) === rawData.productName) {
                   const updateStock =  this.datasourceCopy[i].stock - 0;
                  for(let y=0; y < this.dataSource.data.length; y++) {
                      if(this.dataSource.data[y].productName === rawData.productName) {
                        this.dataSource.data[y].stock = updateStock;
                        break;
                      }
                  }
                  break;
               }
        }
      }
    })
  }

  stockSubscribe() {
    console.log('stock subs')
    this.invoiceProduct.invoiceData.subscribe((productqty : FormGroup) => {
      if(productqty) {
        let rawData = productqty.getRawValue();
        console.log("rawData", rawData)
        for(let i=0; i< this.datasourceCopy.length; i++) {
               if((this.datasourceCopy[i].productName) === rawData.productName) {
                   const updateStock =  this.datasourceCopy[i].stock - rawData.quantity;
                  for(let y=0; y < this.dataSource.data.length; y++) {
                      if(this.dataSource.data[y].productName === rawData.productName) {
                        this.dataSource.data[y].stock = updateStock;
                        break;
                      }
                  }
                  break;
               }
               //this.upadtedProductsList.push(new tempProduct(this.dataSource.data[i].productName, this.dataSource.data[i].inStock))
        }
        console.log("res value", productqty.getRawValue());
        console.log("data source value ", this.dataSource.data);
      }
        
      })
  }

  
}


