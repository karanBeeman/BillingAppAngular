import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pendingbills',
  templateUrl: './pendingbills.component.html',
  styleUrls: ['./pendingbills.component.css']
})
export class PendingbillsComponent implements OnInit {

  currentDateBillObject : any;
  
  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

 
}
