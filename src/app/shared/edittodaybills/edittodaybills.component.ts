import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InoviceBillService } from '../inovice-bill.service';
import { InvoiceDataService } from '../invoice-data.service';

@Component({
  selector: 'app-edittodaybills',
  templateUrl: './edittodaybills.component.html',
  styleUrls: ['./edittodaybills.component.css'],
})
export class EdittodaybillsComponent implements OnInit {
  displayedColumns: string[] = ['Product', 'qty', 'price', 'amount', 'action'];
  productList: string[];
  existingProduct: any;
  productForm: any;
  dataSource = new MatTableDataSource<any>();
  totalamount: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public matDialogRef: MatDialogRef<EdittodaybillsComponent>,
    private invoice : InvoiceDataService,
    private httpClient : HttpClient,
    private invoiceService : InoviceBillService
  ) {}

  ngOnInit(): void {
    console.log('mat dialog', this.data);
    this.existingProduct = this.data;

    this.productForm = this.fb.group({
      productDetails: this.fb.array(
        this.existingProduct.productDetailList.map((val) =>
          this.fb.group({
            productName: new FormControl(val.productName),
            quantity: new FormControl(val.quantity),
            price: new FormControl(val.price),
            amount: new FormControl(val.amount),
            isEditable: new FormControl(false),
            action: new FormControl('existingRecord'),
          })
        )
      ),
    });
    this.dataSource = new MatTableDataSource(
      (this.productForm.get('productDetails') as FormArray).controls
    );
    this.totalamount = 0;
    this.existingProduct.productDetailList.forEach(element => {
      console.log(element.amount)
            this.totalamount =  this.totalamount + element.amount;
            console.log(this.totalamount);
    })

    // this.httpClient.get('http://localhost:8080/ProductList')
    //   .subscribe((productLists) => {
                   
    //   })

    this.invoiceService.getProduct().subscribe(productlists => {
      console.log('productLit from serivce ', productlists);
      this.productList = productlists;
    })
     
    
  }

  addNewRow() {
    const control = this.productForm.get('productDetails') as FormArray;
    control.insert(0,this.newProductForm());
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

editProductList(productElement: any, i: number) {
  productElement.get('productDetails').at(i).get('isEditable').patchValue(true);
}  

cancelEdit(productElement:any, i:any) {
  
  productElement.get('productDetails').at(i).get('isEditable').patchValue(false);
} 

includeProductToList(productElement:any, i:any) {
  productElement.get('productDetails').at(i).get('isEditable').patchValue(false);
}

closeDialog() {
  this.matDialogRef.close();
}

printEditedProductList() {
  console.log(this.productForm);
}
quantityUpdate(qnty : any, i : any) {
  if(qnty.get('productDetails').at(i)?.get('price').value != 0) {
    this.totalamount = 0;
    let addamount = qnty.get('productDetails').at(i)?.get('quantity').value * qnty.get('productDetails').at(i)?.get('price').value;
    qnty.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
     qnty.get('productDetails').controls.forEach((element :any) => {
      console.log("element.controls.amount", element.controls.amount.value);
         this.totalamount = element.controls.amount.value + this.totalamount;
         console.log("totalamount " + this.totalamount);
      
     });
  }
  
  this.invoice.changeData(qnty.get('productDetails').at(i));
  console.log("element", qnty);
}

onPriceChange(price: any, i : any) {
  this.totalamount = 0;
  let addamount = price.get('productDetails').at(i)?.get('quantity').value * price.get('productDetails').at(i)?.get('price').value;
  price.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
  price.get('productDetails').controls.forEach((element :any) => {
    console.log("element.controls.amount", element.controls.amount.value);
       this.totalamount = element.controls.amount.value + this.totalamount;
       console.log("totalamount " + this.totalamount);
    
   });
  console.log("price - " , price.value.price * price.value.qty);
}


}
