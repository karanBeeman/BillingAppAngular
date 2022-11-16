import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { InvoiceDataService } from '../shared/invoice-data.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit {

  @ViewChild('drawer') public drawer: MatSidenav;
  
  mediaSub!: Subscription;
  private activeMediaQuery = '';
  deviceXs!: boolean;

  constructor(private mediaObserver:MediaObserver, private sideNavService: InvoiceDataService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change) => {
      change.forEach((item) => {
       this.activeMediaQuery = item.mqAlias;
       this.deviceXs = item.mqAlias === 'lt-xl' ? true : false;
      })
      console.log(this.activeMediaQuery);
    });

    // this.sideNavService.setSidenav(this.sidenav);
    
  }

  ngAfterViewInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      console.log(this.drawer);
      this.drawer.toggle();
    });
  } 

}
