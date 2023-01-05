import { HttpClient } from '@angular/common/http';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TestScheduler } from 'rxjs/testing';
import { InoviceBillService } from '../inovice-bill.service';
import { InvoiceDataService } from '../invoice-data.service';

@Component({
  selector: 'app-edittodaybills',
  templateUrl: './edittodaybills.component.html',
  styleUrls: ['./edittodaybills.component.css'],
})
export class EdittodaybillsComponent implements OnInit {
  displayedColumns: string[] = ['Product', 'qty', 'price', 'amount', 'action'];
  productList: any;
  existingProduct: any;
  productForm: any;
  dataSource = new MatTableDataSource<any>();
  totalamount: number;
  copySource: any;
  stockSource: any;
  stockDataActual: any;
  stockDataActualC: any;
  stockDataActualCopy: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public matDialogRef: MatDialogRef<EdittodaybillsComponent>,
    private invoice: InvoiceDataService,
    private httpClient: HttpClient,
    private invoiceService: InoviceBillService
  ) {}

  ngOnInit(): void {
    console.log('mat dialog', this.data);
    this.existingProduct = this.data;

    this.invoiceService.getStockDetails().subscribe((productlists) => {
      console.log('edittoday bills product Date ', productlists);
      this.productList = productlists;
      this.stockSource = JSON.stringify(productlists);
      this.stockDataActual = JSON.parse(this.stockSource);
      console.log(' this.stockDataActual',  this.stockDataActual);
       for(let i =0; i<this.stockDataActual.length; i++) {
        for(let y =0; y<this.existingProduct.productDetailList.length; y++) {
          if(this.existingProduct.productDetailList[y].productName == this.stockDataActual[i].productName) {
            this.stockDataActual[i].stock = parseInt(this.stockDataActual[i].stock) + this.existingProduct.productDetailList[y].quantity;
          }
        }
    }
    this.stockDataActualC = JSON.stringify(this.stockDataActual);
    console.log('this.stockDataActualC ', this.stockDataActualC )
     this.stockDataActualCopy =JSON.parse(this.stockDataActualC);
     console.log(' this.stockDataActualCopy',  this.stockDataActualCopy);
    });

    this.productForm = this._formBuilder.group({
      productDetails: this._formBuilder.array([])
    });

    this.productForm = this.fb.group({
      productDetails: this.fb.array(
        this.existingProduct.productDetailList.map((val) =>
          this.fb.group({
            productName: new FormControl(val.productName),
            quantity: new FormControl(),
            price: new FormControl(val.price),
            amount: new FormControl(),
            isEditable: new FormControl(false),
            action: new FormControl('existingRecord'),
          })
        )
      ),
    });

    this.copySource = this.existingProduct.productDetailList;
    this.dataSource = new MatTableDataSource(
      (this.productForm.get('productDetails') as FormArray).controls
    );
    // this.totalamount = 0;
    // this.existingProduct.productDetailList.forEach((element) => {
    //   console.log(element.amount);
    //   this.totalamount = this.totalamount + element.amount;
    //   console.log(this.totalamount);
    // });

  }

  addNewRow() {
    const control = this.productForm.get('productDetails') as FormArray;
    control.insert(0, this.newProductForm());
    this.dataSource = new MatTableDataSource(control.controls);
  }

  newProductForm(): FormGroup {
    return this.fb.group({
      productName: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      amount: new FormControl(''),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(true),
      isNewRow: new FormControl(true),
    });
  }

  includeProductToList(productElement: any, i: any) {
    productElement
      .get('productDetails')
      .at(i)
      .get('isEditable')
      .patchValue(false);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  printEditedProductList() {
    let invoiceData = {};
    console.log(this.existingProduct);
    console.log(this.productForm);
    console.log(this.stockDataActualCopy);
    const prodDetails = this.productForm.get('productDetails') as FormArray;
    for(let x =0; x<prodDetails.length; x++) {
        if(prodDetails.controls.at(x).value.quantity == '' || prodDetails.controls.at(x).value.quantity == null 
                || prodDetails.controls.at(x).value.price == '') {
            alert('check all data is correct');
            break;
        }
    }

    invoiceData = {
      "invoiceNumber": this.existingProduct.invoiceNumber,
      "hotelDetails": this.existingProduct.hotelDetails,
      "date": this.existingProduct.date,
      "productDetailList": prodDetails.value,
    };

    console.log('invoiceData',invoiceData);
    this.invoiceService.updateInvoiceBill(invoiceData).subscribe(res => {
          if(res) {
            this.invoiceService.ModifyPendingBills(res).subscribe(modifiedBill => {
             if(modifiedBill) {
              this.invoiceService.postStockDetails(this.stockDataActualCopy);
             }
            })
          }
    });
    
   // this.httpClient.updateInvoiceBill(this.productForm);
  }
  
  // quantityUpdate(qnty: any, i: any) {
  //   if (qnty.get('productDetails').at(i)?.get('price').value != 0) {
  //     this.totalamount = 0;
  //     let addamount =
  //       qnty.get('productDetails').at(i)?.get('quantity').value *
  //       qnty.get('productDetails').at(i)?.get('price').value;
  //     qnty.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
  //     qnty.get('productDetails').controls.forEach((element: any) => {
  //       console.log('element.controls.amount', element.controls.amount.value);
  //       this.totalamount = element.controls.amount.value + this.totalamount;
  //       console.log('totalamount ' + this.totalamount);
  //     });
  //   }

  //   this.invoice.invoiceData.next(qnty.get('productDetails').at(i));
  //   console.log('element', qnty);
  // }

  quantityUpdate(qnty: any, x:any) {
     console.log('qnty', qnty);
    for(let i=0; i< this.stockDataActual.length; i++) {
      if((this.stockDataActual[i].productName) === qnty.get('productDetails').at(x)?.get('productName').value) {
          const updateStock =  this.stockDataActual[i].stock - qnty.get('productDetails').at(x)?.get('quantity').value;
         for(let y=0; y < this.stockDataActualCopy.length; y++) {
             if(this.stockDataActualCopy[y].productName === qnty.get('productDetails').at(x)?.get('productName').value) {
              this.stockDataActualCopy[y].stock = updateStock;
               break;
             }
         }
         break;
      }
    }
    if (qnty.get('productDetails').at(x)?.get('price').value != 0) {
          this.totalamount = 0;
          let addamount =
            qnty.get('productDetails').at(x)?.get('quantity').value *
            qnty.get('productDetails').at(x)?.get('price').value;
          qnty.get('productDetails').at(x)?.get('amount')?.patchValue(addamount);
          qnty.get('productDetails').controls.forEach((element: any) => {
            console.log('element.controls.amount', element.controls.amount.value);
            this.totalamount = element.controls.amount.value + this.totalamount;
            console.log('totalamount ' + this.totalamount);
          });
        }
  }

  onPriceChange(price: any, i: any) {
    this.totalamount = 0;
    let addamount =
      price.get('productDetails').at(i)?.get('quantity').value *
      price.get('productDetails').at(i)?.get('price').value;
    price.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
    price.get('productDetails').controls.forEach((element: any) => {
      console.log('element.controls.amount', element.controls.amount.value);
      this.totalamount = element.controls.amount.value + this.totalamount;
      console.log('totalamount ' + this.totalamount);
    });
    console.log('price - ', price.value.price * price.value.qty);
  }

  // removeRow(i: any) {
  //   this.totalamount = 0;
  //   const prodDetails = this.productForm.get('productDetails') as FormArray;
  //   console.log('prodDetails', prodDetails.controls.at(i));
  //   if (prodDetails.controls.at(i).value.quantity != '') {
  //     this.invoice.stockUpdateOnDelete.next(prodDetails.controls.at(i));
  //     console.log('not null');
  //   }

  //   prodDetails.removeAt(i);
  //   prodDetails.controls.forEach((element: any) => {
  //     this.totalamount = element.controls.amount.value + this.totalamount;
  //   });
  //   this.dataSource._updateChangeSubscription();
  // }

  removeRow(x: any) {
    this.totalamount = 0;
    const prodDetails = this.productForm.get('productDetails') as FormArray;
    console.log('prodDetails', prodDetails.controls.at(x));
    if (prodDetails.controls.at(x).value.quantity != '') {
      for(let i=0; i< this.stockDataActual.length; i++) {
        if((this.stockDataActual[i].productName) === prodDetails.controls.at(x).value.productName) {
            const updateStock =  this.stockDataActual[i].stock;
           for(let y=0; y < this.stockDataActualCopy.length; y++) {
               if(this.stockDataActualCopy[y].productName === prodDetails.controls.at(x).value.productName) {
                this.stockDataActualCopy[y].stock = updateStock;
                 break;
               }
           }
           break;
        }
      }
    }
    prodDetails.removeAt(x);
    prodDetails.controls.forEach((element: any) => {
      this.totalamount = element.controls.amount.value + this.totalamount;
    });
    this.dataSource._updateChangeSubscription();
  }

}
