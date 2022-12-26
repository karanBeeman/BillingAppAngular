import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InoviceBillService {
  
  stockObject : any;

   saveCusotmerDetails(customerDetails: any) :  Observable<any> {
    return this.httpClient.post('http://localhost:8080/save/cusotmerdetails', customerDetails).pipe(map(res=> res));
  } 

  postStockDetails(stockForm: any) :  Observable<any> {
   this.stockObject = stockForm;
    console.log("salkdfjlkasjfd", this.stockObject)
    return this.httpClient.post('http://localhost:8080/stockdetails/save', this.stockObject).pipe(map(res => res));
  }

  constructor(private httpClient: HttpClient) { }

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
  map(response => 
    
    response));
  
}

}
