import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';
import { InvoiceDataService } from 'src/app/shared/invoice-data.service';

@Component({
  selector: 'app-stockdetails',
  templateUrl: './stockdetails.component.html',
  styleUrls: ['./stockdetails.component.css'],
})
export class StockdetailsComponent implements OnInit {
  stockObject: any;
  stockForm: any;
  editApplied = false;
  copySource: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['productName', 'stock', 'action'];
  constructor(private httpClient: HttpClient, private fb: FormBuilder, private invoiceBillService: InoviceBillService) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      stockDetails: this.fb.array([])
    });

this.httpClient
      .get('http://localhost:8080/ProductList')
      .subscribe((res) => {
        console.log('stock detials', res);
        this.stockObject = res;
        
        this.stockForm = this.fb.group({
          stockDetails: this.fb.array(
            this.stockObject.map((objectValue) => 
              this.fb.group({
                productName: new FormControl(objectValue.productName),
                stock: new FormControl(objectValue.inStock),
                isEditable: new FormControl(false),
                action: new FormControl('existingRecord'),
              })
            )
          ),
        });
        this.copySource = this.stockObject;
        this.dataSource = new MatTableDataSource(
          (this.stockForm.get('stockDetails') as FormArray).controls
        );
  });
}

addNewRow() {
  const control = this.stockForm.get('stockDetails') as FormArray;
  control.insert(0,this.newStockForm());
  this.dataSource = new MatTableDataSource(control.controls);
}  

onEdit(stockform: any, i: number) {
    stockform.get('stockDetails').at(i).get('isEditable').patchValue(true);
}

cancelEdit(productElement:any, i:number) {
    this.copySource.forEach(element => {
      console.log('eken', element)
      if(productElement.get('stockDetails').at(i).get('productName').value == element.productName) {
        productElement.get('stockDetails').at(i).get('stock').patchValue(element.inStock);
      }
    });
    productElement.get('stockDetails').at(i).get('isEditable').patchValue(false);
} 

includeProductToList(productElement:any, i:number) {
  productElement.get('stockDetails').at(i).get('isEditable').patchValue(false);
}

newStockForm(): FormGroup {
  return this.fb.group({
    productName: new FormControl(''),
    stock: new FormControl(''),
    price: new FormControl(''),
    isEditable: new FormControl(true),
    action: new FormControl('newRecord')
  });
}

updateStock() {
 this.invoiceBillService.postStockDetails(this.stockForm).subscribe(res => res );
   console.log("update stock component : ", this.stockForm );
}

}
