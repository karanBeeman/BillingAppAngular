import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  displayedColumns: string[] = ['Product', 'price'];
  dataSource = new MatTableDataSource<any>();
  customerDefaultProduct:FormGroup;

  constructor(private fb: FormBuilder) { }
  customerDetails :FormGroup = new FormGroup({
    customerName : new FormControl(''),
    customerAddress : new FormControl(''),
    customerGstNumber : new FormControl(''),
    customerPhoneNumber : new FormControl('')
   })

  ngOnInit(): void {
  
    this.customerDefaultProduct = this.fb.group({
      customerDefaultProducts: this.fb.array([])
    });

       
  }

}
