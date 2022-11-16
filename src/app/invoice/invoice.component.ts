import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { LinksComponent } from '../links/links.component';
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
  constructor(private mediaObserver:MediaObserver ) { }

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

}
