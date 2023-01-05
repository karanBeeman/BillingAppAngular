import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EdittodaybillsComponent } from 'src/app/shared/edittodaybills/edittodaybills.component';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';

@Component({
  selector: 'app-todays-bills',
  templateUrl: './todays-bills.component.html',
  styleUrls: ['./todays-bills.component.css']
})
export class TodaysBillsComponent implements OnInit {

  displayedRows: any;
  totalamount: number;
  constructor(private httpClient: HttpClient, private dialog : MatDialog, private invoiceBillService : InoviceBillService) { }

  ngOnInit(): void {
   this.invoiceBillService.getTodayDateBills().subscribe(res => {
    console.log('todays bill', res);
    this.displayedRows = res;
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
