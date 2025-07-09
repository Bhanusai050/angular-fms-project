import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnimalsComponent } from './animals/animals.component';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedInventoryComponent } from './feed-inventory/feed-inventory.component';
import { InvestmentComponent } from './investments/investments.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductionComponent } from '../production/production.component';
import { VendorComponent } from '../vendor/vendor.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'animals', component: AnimalsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'feed-inventory', component: FeedInventoryComponent },
      { path: 'investments', component: InvestmentComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'production', component: ProductionComponent },
      { path: 'vendor', component: VendorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
