import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingbillsComponent } from './pendingbills/pendingbills.component';
import { StockdetailsComponent } from './stockdetails/stockdetails.component';
import { TodaysBillsComponent } from './todays-bills/todays-bills.component';

const routes: Routes = [
  
  {path:'', component:HomeComponent,
     children: [
        {path:'todaybill', component:TodaysBillsComponent},
        {path:'pendingbills', component:PendingbillsComponent},
        {path:'stockdetails', component:StockdetailsComponent}
     ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillCategoryRoutingModule { }
