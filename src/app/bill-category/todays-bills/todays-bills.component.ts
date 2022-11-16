import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EdittodaybillsComponent } from 'src/app/shared/edittodaybills/edittodaybills.component';

@Component({
  selector: 'app-todays-bills',
  templateUrl: './todays-bills.component.html',
  styleUrls: ['./todays-bills.component.css']
})
export class TodaysBillsComponent implements OnInit {

  displayedRows: any;
  totalamount: number;
  constructor(private httpClient: HttpClient, private dialog : MatDialog) { }

  ngOnInit(): void {
  this.httpClient.get('http://localhost:8080/currentDateBills').subscribe((res : any) => {
    const rows = res;
    this.displayedRows = rows;
    this.totalamount = 0;
    console.log("displayed Rows" , this.displayedRows);
    // this.displayedRows.forEach(productDetails => {
    //       productDetails.productDetailList.forEach(amount =>{
    //         this.totalamount = this.totalamount + amount.value;
    //         console.log('tot', this.totalamount);
    //       });
        
    // });
  });
 
}

editproducts(item: any) {
  this.dialog.open(EdittodaybillsComponent, {
    disableClose: true,
    autoFocus: false,
    data: item,
    height: '60%',
     width: '60%'
  });
 }
}
