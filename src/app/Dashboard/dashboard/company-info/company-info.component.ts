import { Component } from '@angular/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html'
})
export class CompanyInfoComponent {
  isvisible: boolean = false; // Table/grid is default view
  company = {
    CompanyName: 'My Farm Pvt Ltd',
    OwnerName: 'Manikanta',
    PhoneNumber: '+91-8309488769',
    Email: 'contact@myfarm.com',
    Location: 'Bachupally, Hyderabad',
    CreatedAt: '2025-01-01'
  };
}
