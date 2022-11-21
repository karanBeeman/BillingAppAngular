import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDataService } from 'src/app/shared/invoice-data.service';
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

  @Input() set recievedProduct(prod: any) {
    console.log(prod);
    if (prod) {
      this.AddNewRow(prod);
    }
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private invoice: InvoiceDataService,
    private invoiceBillService: InoviceBillService
  ) {}
  hotelDetails: FormGroup = new FormGroup({
    details: new FormControl(''),
  });

  dateDetails: FormGroup = new FormGroup({
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.invoiceBillService
      .getCustomerDetailsWithdefaultProducts()
      .subscribe((customerList) => {
        customerList.forEach((custList) => {
          this.hotelDetailArray.push(custList.hotelDetails);
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
    const hotelDetails = this.hotelDetails.controls['details'].value;
    const dateDetails = this.dateDetails.value;
    const productDetails = this.productForm.controls['productDetails'].value;
    console.log(productDetails);
    const invoiceData = {
      hotelDetails: hotelDetails,
      //date: dateDetails,
      productDetailList: productDetails,
    };
    this.httpClient
      .post('http://localhost:8080/invoiceData', invoiceData)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(invoiceData);
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
    console.log('element', qnty);
  }

  onHotelChange(hotel: any) {
    this.invoiceBillService
      .getSelectedCusotmerProducts(hotel.value.hotelName)
      .subscribe((res) => {
        console.log('res ....', res.defaultProductWithPriceList);
        this.productForm = this.fb.group({
          productDetails: this.fb.array(
            res.defaultProductWithPriceList.map((val) =>
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
      });

    console.log('dataSource', this.dataSource);
    this.hotelGST = hotel.value.hotelGstNumber;
    this.hotelAddress = hotel.value.hotelAddress;
    this.hotelNumber = hotel.value.hotelPhoneNumber;
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

  removeRow(form: FormGroup, i: any) {
    console.log('removed');
  }
}
