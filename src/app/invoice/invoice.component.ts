import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvoiceproductComponent } from '../invoiceproduct/invoiceproduct.component';
import { LinksComponent } from '../links/links.component';
import { InoviceBillService } from '../shared/inovice-bill.service';
import { InvoiceDataService } from '../shared/invoice-data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  product : any;
  mediaSub!: Subscription;
  private activeMediaQuery = '';
  deviceXs!: boolean;
  toggleActive = false;
  @ViewChild('invoiceProduct') invoiceProductCmpnt: InvoiceproductComponent
  constructor(private mediaObserver:MediaObserver, private invoiceBillService: InoviceBillService, private route: Router ) { }

  ngOnInit(): void {

    

    this.mediaSub = this.mediaObserver.asObservable().subscribe((change) => {
      change.forEach((item) => {
       this.activeMediaQuery = item.mqAlias;
       this.deviceXs = item.mqAlias === 'lt-xl' ? true : false;
      })
      console.log(this.activeMediaQuery);
    });
  }

  clickMenu() {
    console.log("clicked")
    this.toggleActive = !this.toggleActive;
    //this.sidenav.toggle();
  }

  stockUpdateValues(isValid){
    if(isValid){
      console.log(this.invoiceProductCmpnt.ProductData);
       this.invoiceBillService.postStockDetails(this.invoiceProductCmpnt.ProductData);
       this.route.navigateByUrl('/invoice');
    }
    
  }
}
