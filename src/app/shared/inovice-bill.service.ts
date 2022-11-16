import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InoviceBillService {
  asObservable() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  public getProduct() : Observable<any> {
     return this.httpClient.get('http://localhost:8080/ProductList').pipe(
      map((res => res))
     );
  }
    
   

}
