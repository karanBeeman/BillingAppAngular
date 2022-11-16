import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {path:'invoice', component:InvoiceComponent},
  {path:'billcategory', loadChildren:()=>import('./bill-category/bill-category.module').then(m=>m.BillCategoryModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
