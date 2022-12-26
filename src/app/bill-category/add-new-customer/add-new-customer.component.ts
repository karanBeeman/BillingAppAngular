import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  displayedColumns: string[] = ['Product', 'price', 'action'];
  dataSource = new MatTableDataSource<any>();
  newCusotmerForm:FormGroup;
  products: any;

  constructor(private fb: FormBuilder, private InvoiceBillService: InoviceBillService, private router: Router) { }
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

    this.InvoiceBillService.getStockDetails().subscribe(res => {
        this.products = res;
        console.log(res);
    })
  }

  addProducts() {
    const control = this.newCusotmerForm.get('newCusotmerDetails') as FormArray;
    control.insert(0,this.newCustomerForm());
    this.dataSource = new MatTableDataSource(control.controls);
  }  
  

  newCustomerForm(): FormGroup {
    return this.fb.group({
      defaultProducts: new FormControl(''),
      defaultPrice: new FormControl(''),
      action: new FormControl(false) 
    });
  }

  customerFormSubmit() {
    console.log('customer value',this.newCusotmerForm.value);
    const customerDetails = this.customerDetails.value;
    
    const customerData = {
      customerName: this.customerDetails.value.customerName,
      customerAddress: this.customerDetails.value.customerAddress,
      customerGstNumber: this.customerDetails.value.customerGstNumber,
      customerPhoneNumber: this.customerDetails.value.customerPhoneNumber,
      defaultProductWithPriceList: this.newCusotmerForm.value.newCusotmerDetails
    };
    console.log('customer data', customerData)
    this.InvoiceBillService.saveCusotmerDetails(customerData).subscribe(res => res);
      this.router.navigateByUrl("customer");
    
  }

  removeRow(i: any) {
    
  const prodDetails = this.newCusotmerForm.get('newCusotmerDetails') as FormArray;
  console.log("prodDetails", prodDetails.controls.at(i));
 
  prodDetails.removeAt(i);
  this.dataSource._updateChangeSubscription();

}


}
