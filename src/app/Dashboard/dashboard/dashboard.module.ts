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
import { AuthService } from '../../auth.service';
import { RbacGuard } from '../../rbac.guard';
import { AnimalBatchesComponent } from './animal-batches/animal-batches.component';
import { AssetsComponent } from './assets/assets.component';
import { FeedPurchasesComponent } from './feed-purchases/feed-purchases.component';
import { FeedConsumptionComponent } from './feed-consumption/feed-consumption.component';
import { LandPurchasesComponent } from './land-purchases/land-purchases.component';
import { WorkersComponent } from './workers/workers.component';
import { SalariesComponent } from './salaries/salaries.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LookupManagementComponent } from './lookup-management/lookup-management.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

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
    AnimalBatchesComponent,
    AssetsComponent,
    FeedPurchasesComponent,
    FeedConsumptionComponent,
    LandPurchasesComponent,
    WorkersComponent,
    SalariesComponent,
    CompanyInfoComponent,
    LookupManagementComponent,
    ReportsComponent,
    AdminSettingsComponent,
    // Add other components here (if any)
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    RbacGuard
  ]
})
export class DashboardModule {}
