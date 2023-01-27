import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, switchMap, toArray } from 'rxjs';
import { __spreadArrays } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class InoviceBillService {
  
  stockObject : any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  saveInvoiceData(invoice: any) {
   return this.httpClient
    .post('http://localhost:8080/invoice', invoice).pipe(
      map((response) => {
         return response;
      } ),catchError((error : any) => {
          alert(error.error);
        return error
      })
    )
  }

  updateInvoiceBill(invoiceData: any) {
    return this.httpClient
    .put('http://localhost:8080/update/invoice', invoiceData).pipe(
      map((response) => {
         return response;
      } ),catchError((error : any) => {
          alert(error.error);
        return error
      })
    )
  }
  

  savePendingBills(input: any) {
    return this.httpClient.post('http://localhost:8080/save/pendingBills', input).pipe(
      map((response: any) => {
        return response;
      }), catchError((error: any) => {
        alert(error.error);
        return error
      })
     )
  }

  updatePenidngBills(pendingbill: {}) {
    return this.httpClient.post('http://localhost:8080/update/pendingbills', pendingbill).pipe(
      map((response : any) => {
        alert('updated successfully')
        return response;
      }), catchError((error : any) => {
        alert('not updated Successfully')
        return error;
      })
    )
  }

  ModifyPendingBills(modifyBill: any) {
    return this.httpClient.put('http://localhost:8080/modify/pendingbills', modifyBill).pipe(
      map((response : any) => {
        alert('updated successfully')
        return response;
      }), catchError((error : any) => {
        alert('not updated Successfully')
        return error;
      })
    )
  }
  

   saveCusotmerDetails(customerDetails: any) :  Observable<any> {
    return this.httpClient.post('http://localhost:8080/save/cusotmerdetails', customerDetails).pipe(map(res=> res));
  } 

  postStockDetails(stockForm: any){
   this.stockObject = stockForm;
    this.httpClient.post<string>('http://localhost:8080/stockdetails/save', this.stockObject).subscribe(stockResponse => {
       console.log('stockReponse ',stockResponse)
    });
  
  }

  public getProduct() : Observable<any> {
     return this.httpClient.get('http://localhost:8080/ProductList').pipe(
      map((res => res))
     );
  }

  public getCustomerDetailsWithdefaultProducts() : Observable<any> {
    return  this.httpClient.get('http://localhost:8080/get/existingcustomer').pipe((map(res => res)));
  }
   
 public getSelectedCusotmerProducts(customerName : string) : Observable<any> {
   console.log("customerName", customerName);
      return this.httpClient.get('http://localhost:8080/customer/' + customerName).pipe(map(res => res));
 } 

 public getStockDetails() : Observable<any> {
  return this.httpClient.get('http://localhost:8080/stock/retrieve').pipe(map(res => res));
}

deleteExistingCUstomer(customer: any) : Observable<any>{
 return this.httpClient.post('http://localhost:8080/delete/customer', customer).pipe(map(res => res));
}

getInvoiceNumber() {
 return this.httpClient.get('http://localhost:8080/getInvoicenumber',{responseType: 'text'}).pipe(
  map(response =>  response));
}

getTodayDateBills() {
  return this.httpClient.get('http://localhost:8080/currentDateBills');
}

getAllBills() {
  return this.httpClient.get('http://localhost:8080/getAllBills');
}

pendingBillInfo(invoiceNumber: any) {
  const params = new HttpParams().set('invoiceNumber', invoiceNumber);
  return this.httpClient.get('http://localhost:8080/getpendingbills', {params});
}

retrieveSelectedDateBills(date : any) {
  console.log(date);
const params = new HttpParams().set('date', date.value);
 return this.httpClient.get('http://localhost:8080/getpendingBills/date', {params});

}

saveToClosedBills(element: any) {
   this.httpClient.post('http://localhost:8080/save/closedbill', element).subscribe(result => result);
}

getClosedBills() {
  return this.httpClient.get('http://localhost:8080/get/closedbills');
}

getBillsBasedOnMonth(year : any, month: any) {
   const monthValue = month + 1;
  const params = {
    year: year,
    month: monthValue
  };
  console.log('params', params);
  return this.httpClient.get('http://localhost:8080/get/monthlybill', {params});
}

generateExcel(displayedRows: any) {
  return this.httpClient.post('http://localhost:8080/generate/excel', displayedRows);
 }

}
