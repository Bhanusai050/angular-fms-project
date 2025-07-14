import { Component } from '@angular/core';

@Component({
  selector: 'app-animal-batches',
  templateUrl: './animal-batches.component.html'
})
export class AnimalBatchesComponent {
  isvisible: boolean = false; // Table/grid is default view
  animalBatchesData: any[] = [
    { BatchID: 1, BatchName: 'Batch A', PurchasedDate: '2025-06-01', Purpose: 'Milk' },
    { BatchID: 2, BatchName: 'Batch B', PurchasedDate: '2025-06-15', Purpose: 'Meat' }
  ];
}
