import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AnimalsComponent } from './animals/animals.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedInventoryComponent } from './feed-inventory/feed-inventory.component';
import { InvestmentComponent } from './investments/investments.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductionComponent } from '../production/production.component';
import { VendorComponent } from '../vendor/vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AnimalsComponent,
    CustomersComponent,
    ExpensesComponent,
    FeedInventoryComponent,
    InvestmentComponent,
    OrdersComponent,
    ProductionComponent,
    VendorComponent,
    // Add other components here (if any)
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
