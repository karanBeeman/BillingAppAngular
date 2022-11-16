import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './AngularMaterial/angular-material.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceformComponent } from './invoiceform/invoiceform.component';
import { InvoiceproductComponent } from './invoiceproduct/invoiceproduct.component';

import { HttpClientModule } from '@angular/common/http';
import { LinksComponent } from './links/links.component';
import { InvoiceDataService } from './shared/invoice-data.service';
import { BillCategoryModule } from './bill-category/bill-category.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EdittodaybillsComponent } from './shared/edittodaybills/edittodaybills.component';



@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    InvoiceformComponent,
    InvoiceproductComponent,
    LinksComponent,
    EdittodaybillsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BillCategoryModule,
    FlexLayoutModule
  ],
  providers: [InvoiceDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
