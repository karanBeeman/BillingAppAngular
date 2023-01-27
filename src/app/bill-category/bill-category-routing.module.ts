import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { ClosedComponent } from './closed/closed.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { MonthlyBillComponent } from './monthly-bill/monthly-bill.component';
import { PendingbillsComponent } from './pendingbills/pendingbills.component';
import { StockdetailsComponent } from './stockdetails/stockdetails.component';
import { TodaysBillsComponent } from './todays-bills/todays-bills.component';

const routes: Routes = [
  
  {path:'', component:HomeComponent,
     children: [
        {path:'todaybill', component:TodaysBillsComponent},
        {path:'pendingbills', component:PendingbillsComponent},
        {path:'stockdetails', component:StockdetailsComponent},
        {path:'customer', component:CustomerComponent},
        {path:'closedbill', component:ClosedComponent},
        {path:'monthlybill', component:MonthlyBillComponent}
     ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillCategoryRoutingModule { }
