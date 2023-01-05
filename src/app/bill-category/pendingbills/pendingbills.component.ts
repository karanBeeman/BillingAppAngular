import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from 'src/app/shared/confirmation-dialog-component/confirmation-dialog-component.component';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';

@Component({
  selector: 'app-pendingbills',
  templateUrl: './pendingbills.component.html',
  styleUrls: ['./pendingbills.component.css']
})
export class PendingbillsComponent implements OnInit {

  invoiceNumber: any;
  showFiller = false;
  displayedRows: any;
  pendingBill: any;
  pendingBillC: any;
  selectedDate : any;
  receiveAmount: number;
  pendingBillCopy: any;
  flag: boolean = false;
  constructor(private invoiceBillService : InoviceBillService, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.invoiceBillService.getAllBills().subscribe(res => {
    console.log('todays bill', res);
    this.displayedRows = res;
   });
}

getPendingList(invoiceNumber: any) {
  this.invoiceBillService.pendingBillInfo(invoiceNumber).subscribe((res:any) => {
    this.pendingBill = res;
    this.pendingBillC = JSON.stringify(res);
    this.pendingBillCopy = JSON.parse(this.pendingBillC);
    console.log(this.pendingBill);
    console.log(this.pendingBillCopy.length);
    const lastIndex = this.pendingBillCopy.length - 1;
    this.pendingBillCopy = this.pendingBillCopy[lastIndex];
    this.invoiceNumber = this.pendingBillCopy.invoiceNumber;
    this.pendingBillCopy = Array.of(this.pendingBillCopy);
   });
  }

  updateBill() {
    console.log("selected", this.selectedDate);
    let pendingbill = {}; 
    this.pendingBillCopy.forEach(element => {
       const total = element.totalAmount
       pendingbill = {
          "customerName" : element.customerName,
          "invoiceNumber": element.invoiceNumber,
          "date": this.selectedDate.toLocaleDateString(),
          "receivedAmount": this.receiveAmount,
          "totalAmount": total - this.receiveAmount
       }
    });
    console.log('PendingBillCopy',this.pendingBillCopy);
    this.invoiceBillService.updatePenidngBills(pendingbill).subscribe(res => {
      console.log('updated list ', res);
      this.getPendingList(res.invoiceNumber);
      this.selectedDate = '';
      this.receiveAmount= undefined;
    });
  }


  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: {message: 'Are you sure you want to CLOSE this bill ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayedRows.forEach(element => {
           if(element.invoiceNumber == this.pendingBill[0].invoiceNumber) {
               console.log('element retrieved', element);
               this.invoiceBillService.saveToClosedBills(element);
           }
        })
      } else {
        console.log('no');
      }
    });
  }

  retrieveSelectedDateData(date : any) {
    if(date.value!= null) {
    const dateValue = date;
     this.invoiceBillService.retrieveSelectedDateBills(dateValue).subscribe(data => {
      console.log(data);
      this.displayedRows= '';
      this.displayedRows = data;
     })
  } else {
    this.invoiceBillService.getAllBills().subscribe(res => {
      this.displayedRows= '';
      this.displayedRows = res;
     });
  }
}

toggle() {
  console.log(this.flag)
  this.flag = false;
  console.log(this.flag)
}
 
} 
