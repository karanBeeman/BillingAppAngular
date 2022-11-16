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

public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  changeData(newData: object) {
	console.log('newData', newData);
	this.dataSub.next(newData);
  }
 

	// public setSidenav(sidenav: MatSidenav) {
	// 	this.sidenav = sidenav;
	// }

	// public open() {
	// 	return this.sidenav.open();
	// }


	// public close() {
	// 	return this.sidenav.close();
	// }

	public toggle(): void {
	   this.sideNavToggleSubject.next(null);
	}
}

