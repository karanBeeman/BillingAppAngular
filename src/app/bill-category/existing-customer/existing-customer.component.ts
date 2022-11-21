import { Component, OnInit } from '@angular/core';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';
import { InvoiceDataService } from 'src/app/shared/invoice-data.service';

@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  displayedRows: any;
  constructor(private invoiceBillservice: InoviceBillService) { }

  ngOnInit(): void {
      this.invoiceBillservice.getCustomerDetailsWithdefaultProducts().subscribe(customerWithProdLit => {
        console.log("cusotmerWithProdList", customerWithProdLit);
        this.displayedRows = customerWithProdLit;
      })
  }

}
