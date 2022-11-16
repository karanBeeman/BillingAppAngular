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


@NgModule({
  declarations: [
    TodaysBillsComponent,
    HeaderComponent,
    PendingbillsComponent,
    HomeComponent,
    StockdetailsComponent
  ],
  imports: [
    CommonModule,
    BillCategoryRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ], 
  exports: [TodaysBillsComponent]
})
export class BillCategoryModule { }
