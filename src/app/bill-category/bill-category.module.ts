import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillCategoryRoutingModule } from './bill-category-routing.module';
import { TodaysBillsComponent } from './todays-bills/todays-bills.component';
import { AngularMaterialModule } from '../AngularMaterial/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PendingbillsComponent } from './pendingbills/pendingbills.component';
import { HomeComponent } from './home/home.component';
import { StockdetailsComponent } from './stockdetails/stockdetails.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { FormsModule } from '@angular/forms';
import { ClosedComponent } from './closed/closed.component';
import { MonthlyBillComponent } from './monthly-bill/monthly-bill.component';


@NgModule({
  declarations: [
    TodaysBillsComponent,
    HeaderComponent,
    PendingbillsComponent,
    HomeComponent,
    StockdetailsComponent,
    AddNewCustomerComponent,
    CustomerComponent,
    ExistingCustomerComponent,
    ClosedComponent,
    MonthlyBillComponent,
  ],
  imports: [
    CommonModule,
    BillCategoryRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ], 
  exports: [TodaysBillsComponent],
  
})
export class BillCategoryModule { }
