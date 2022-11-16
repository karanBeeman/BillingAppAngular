import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InoviceBillService {
  asObservable() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  public getProduct() : Observable<any> {
     const data = [];
     return this.httpClient.get('http://localhost:8080/ProductList').pipe(
      map((res : any) => res.forEach(product => {
        //console.log(product);
        data.push(product.productName); 
        console.log(data)
      }
      ))
     );
    //  console.log(data, 'data')
       return of(data);
  }

}
