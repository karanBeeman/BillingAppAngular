import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  //private sidenav: MatSidenav;

  data: object = {};
  private dataSub = new BehaviorSubject<object>(this.data);
  currentData = this.dataSub.asObservable();

public invoiceData = new Subject<any>();

  constructor() { }
 
}

