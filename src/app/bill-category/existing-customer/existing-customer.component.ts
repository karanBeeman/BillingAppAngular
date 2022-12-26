import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';
import { InvoiceDataService } from 'src/app/shared/invoice-data.service';

@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  displayedRows: any;
  constructor(private invoiceBillservice: InoviceBillService, private router: Router) { }

  ngOnInit(): void {
      this.invoiceBillservice.getCustomerDetailsWithdefaultProducts().subscribe(customerWithProdLit => {
        this.displayedRows = customerWithProdLit;
      })
  }

  deleteExistingCustomer(customer: any) {
     console.log(customer, 'customer');
     this.invoiceBillservice.deleteExistingCUstomer(customer).subscribe(res => res);
     this.router.navigateByUrl("customer");
  }

}
