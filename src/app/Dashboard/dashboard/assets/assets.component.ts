import { Component } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html'
})
export class AssetsComponent {
  isvisible: boolean = false; // Table/grid is default view
  assetsData: any[] = [
    { AssetID: 1, AssetName: 'Tractor', Category: 'Machinery', PurchaseDate: '2025-01-10', Cost: 500000, VendorName: 'Vendor A', Notes: 'Main tractor' },
    { AssetID: 2, AssetName: 'Barn', Category: 'Building', PurchaseDate: '2024-05-20', Cost: 200000, VendorName: 'Vendor B', Notes: 'Main barn' }
  ];
}
