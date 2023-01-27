import { Component, OnInit } from '@angular/core';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-bill',
  templateUrl: './monthly-bill.component.html',
  styleUrls: ['./monthly-bill.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthlyBillComponent implements OnInit {
  displayedRows: any;
  totalAmount: number;
  selectedMonth: any;

  constructor(private invoiceBillService : InoviceBillService) { }
  date = new FormControl(moment()); 
  currentDate = new Date();
  ngOnInit(): void {
   this.totalAmount = 0;
   this.selectedMonth = this.currentDate;
    this.invoiceBillService.getBillsBasedOnMonth(this.currentDate.getFullYear(), this.currentDate.getMonth()).subscribe(monthlyBills => {
      this.displayedRows = monthlyBills;
      console.log(this.displayedRows);
      this.displayedRows.forEach(element => {
        this.totalAmount = this.totalAmount + element.totalAmount;
      });
      console.log(this.displayedRows);
    })
  }

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    this.totalAmount = 0;
     this.selectedMonth = normalizedMonthAndYear;
    datepicker.close();
    this.invoiceBillService.getBillsBasedOnMonth(normalizedMonthAndYear.year(), normalizedMonthAndYear.month()).subscribe(monthlyBills => {
      this.displayedRows = monthlyBills;
      this.displayedRows.forEach(element => {
        this.totalAmount = this.totalAmount + element.totalAmount;
      });
    })
  }

  generateExcel() {
    // this.displayedRows = Array.of(this.displayedRows);
    console.log(this.displayedRows);
    this.invoiceBillService.generateExcel(this.displayedRows).subscribe(res => res);
  }
  

}
