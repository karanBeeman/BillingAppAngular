import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  displayedColumns: string[] = ['Product', 'price'];
  dataSource = new MatTableDataSource<any>();
  newCusotmerForm:FormGroup;

  constructor(private fb: FormBuilder) { }
  customerDetails :FormGroup = new FormGroup({
    customerName : new FormControl(''),
    customerAddress : new FormControl(''),
    customerGstNumber : new FormControl(''),
    customerPhoneNumber : new FormControl('')
   })

  ngOnInit(): void {
  
    this.newCusotmerForm = this.fb.group({
      newCusotmerDetails: this.fb.array([])
    });  
  }

  addProducts() {
    const control = this.newCusotmerForm.get('newCusotmerDetails') as FormArray;
    control.insert(0,this.newCustomerForm());
    this.dataSource = new MatTableDataSource(control.controls);
  }  
  

  newCustomerForm(): FormGroup {
    return this.fb.group({
      productName: new FormControl(''),
      price: new FormControl(''),
    });
  }

}
