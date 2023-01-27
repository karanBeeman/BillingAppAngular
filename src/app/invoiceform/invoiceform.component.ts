import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDataService } from 'src/app/shared/invoice-data.service';
import { InvoiceproductComponent } from '../invoiceproduct/invoiceproduct.component';
import { InoviceBillService } from '../shared/inovice-bill.service';

export interface ProductData {
  Product: string;
  qty: number;
  price: number;
  amount: number;
}

@Component({
  selector: 'app-invoiceform',
  templateUrl: './invoiceform.component.html',
  styleUrls: ['./invoiceform.component.css'],
})

export class InvoiceformComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['Product', 'qty', 'price', 'amount', 'action'];
  dataSource = new MatTableDataSource<any>();
  hotelDetailsObject: any;
  hotelDetailArray = [];
  productForm: FormGroup;
  prodVlaue: any;
  value: any;
  hotelGST!: string;
  hotelAddress!: string;
  hotelNumber!: any;
  totalamount: any;
  invoiceNumber: any;
  quantityV : any;
  selectDate : Date;
  responseValue : any;

  @Input() set recievedProduct(prod: any) {
    console.log(prod);
    if (prod) {
      this.AddNewRow(prod);
    }
  }

  @Output() submitStockValue = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private invoice: InvoiceDataService,
    private invoiceBillService: InoviceBillService,
  ) {}
  hotelDetails: FormGroup = new FormGroup({
    details: new FormControl(''),
  });

  ngOnInit(): void {
    console.log('sel', this.selectDate)
    this.invoiceBillService.getInvoiceNumber().subscribe(invoiceNumber => {
      this.invoiceNumber = invoiceNumber;
    })
    this.invoiceBillService
      .getCustomerDetailsWithdefaultProducts()
      .subscribe((customerList) => {
        console.log('invoice form customer List', customerList);
        customerList.forEach((custList) => {
          this.hotelDetailArray.push(custList);
        });
        this.hotelDetailsObject = this.hotelDetailArray;
      });
    this.productForm = this._formBuilder.group({
      productDetails: this._formBuilder.array([]),
    });
  }

  AddNewRow(prod: any) {
    const control = this.productForm.get('productDetails') as FormArray;
    console.log('formArray', control);
    control.insert(0, this.addProductForm(prod));
    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource.paginator = this.paginator;
    console.log(this.productForm);
  }

  addProductForm(prod: any): FormGroup {
    return this.fb.group({
      productName: new FormControl(prod.productName),
      quantity: new FormControl(''),
      price: new FormControl(''),
      amount: new FormControl(''),
      action: new FormControl(false),
    });
  }

  onSubmit() {
    console.log('sel', this.selectDate)
    const hotelDetails = this.hotelDetails.controls['details'].value;
    const productDetails = this.productForm.controls['productDetails'].value;
    let qtyPrice = false;
    let invoiceData = {}; 
    if(hotelDetails!='' && this.invoiceNumber!= '' && this.selectDate!= null) {
      for(let i=0; i< productDetails.length; i++) {
        if(productDetails[i].quantity== '' || productDetails[i].price == '')  {
         qtyPrice = true;
          break;
         } 
      } if(!qtyPrice) {
        invoiceData = {
          "invoiceNumber": this.invoiceNumber,
          "hotelDetails": hotelDetails,
          "date": this.selectDate.toLocaleDateString(),
          "productDetailList": productDetails,
        };
       console.log('invoiceform data', invoiceData)
       this.invoiceBillService.saveInvoiceData(invoiceData).subscribe( result => {
          if(result) {
           this.invoiceBillService.savePendingBills(result).subscribe(getResult => {
            if(getResult) {
              alert('successfully saved invoice bills')
              this.submitStockValue.emit(true);
            }
           }) 
          
          }
       });
      } else {
        alert('quantity or price cannot be empty');
      } 
    } else {
      alert('date or hotel details cannot be empty')
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  quantityUpdate(qnty: any, i: any) {
    if (qnty.get('productDetails').at(i)?.get('price').value != 0) {
      this.totalamount = 0;
      let addamount =
        qnty.get('productDetails').at(i)?.get('quantity').value *
        qnty.get('productDetails').at(i)?.get('price').value;
      qnty.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
      qnty.get('productDetails').controls.forEach((element: any) => {
        console.log('element.controls.amount', element.controls.amount.value);
        this.totalamount = element.controls.amount.value + this.totalamount;
        console.log('totalamount ' + this.totalamount);
      });
    }

    this.invoice.invoiceData.next(qnty.get('productDetails').at(i));
    console.log('element', qnty.get('productDetails').at(i));
  }

  onHotelChange(hotel: any) {
   
        console.log('res ....', hotel.value.defaultProductWithPriceList);
        this.productForm = this.fb.group({
          productDetails: this.fb.array(
            hotel.value.defaultProductWithPriceList.map((val) =>
              this.fb.group({
                productName: new FormControl(val.defaultProducts),
                quantity: new FormControl(''),
                price: new FormControl(val.defaultPrice),
                amount: new FormControl(''),
                action: new FormControl(false),
              })
            )
          ),
        });
        this.dataSource = new MatTableDataSource(
          (this.productForm.get('productDetails') as FormArray).controls
        );
     

    console.log('dataSource', this.dataSource);
    this.hotelGST = hotel.value.customerGstNumber;
    this.hotelAddress = hotel.value.customerAddress;
    this.hotelNumber = hotel.value.customerPhoneNumber;
  }

  onPriceChange(price: any, i: any) {
    this.totalamount = 0;
    let addamount =
      price.get('productDetails').at(i)?.get('quantity').value *
      price.get('productDetails').at(i)?.get('price').value;
    price.get('productDetails').at(i)?.get('amount')?.patchValue(addamount);
    price.get('productDetails').controls.forEach((element: any) => {
      console.log('element.controls.amount', element.controls.amount.value);
      this.totalamount = element.controls.amount.value + this.totalamount;
      console.log('totalamount ' + this.totalamount);
    });
    console.log('price - ', price.value.price * price.value.qty);
  }

  removeRow(form:any, i: any) {
    this.totalamount = 0;
  const prodDetails = this.productForm.get('productDetails') as FormArray;
  console.log("prodDetails", prodDetails.controls.at(i));
  if(prodDetails.controls.at(i).value.quantity!= '') {
    this.invoice.stockUpdateOnDelete.next(prodDetails.controls.at(i));
    console.log("not null")
  }
 
  prodDetails.removeAt(i);
  prodDetails.controls.forEach((element: any) => {
    this.totalamount = element.controls.amount.value + this.totalamount;
  })
  this.dataSource._updateChangeSubscription();

}
}

