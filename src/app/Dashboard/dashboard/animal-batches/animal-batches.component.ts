import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-animal-batches',
  templateUrl: './animal-batches.component.html'
})
export class AnimalBatchesComponent implements OnInit {
  // Add method for adding a new batch
  onSubmit(batchForm: any) {
    if (batchForm.invalid) {
      batchForm.markAllAsTouched();
      return;
    }
    const payload = batchForm.value;
    if (payload.BatchID) {
      // Edit
      this.api.updateAnimalBatch(payload.BatchID, payload).subscribe({
        next: () => {
          batchForm.reset();
          this.isvisible = false;
          this.getAnimalBatches();
        },
        error: () => {
          alert('Failed to update batch');
        }
      });
    } else {
      // Add
      this.api.addAnimalBatch(payload).subscribe({
        next: () => {
          batchForm.reset();
          this.isvisible = false;
          this.getAnimalBatches();
        },
        error: () => {
          alert('Failed to add batch');
        }
      });
    }
  }
  isvisible: boolean = false; // Table/grid is default view
  animalBatchesData: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAnimalBatches();
  }

  getAnimalBatches() {
    this.api.getAnimalBatches().subscribe({
      next: (data) => {
        this.animalBatchesData = data;
      },
      error: () => {
        this.animalBatchesData = [];
      }
    });
  }

  onAdd() { this.isvisible = true; }
  onCancel() { this.isvisible = false; }
  onEdit(batch: any) { /* Patch form and set isvisible = true */ }
  onDelete(batch: any) {
    this.api.deleteAnimalBatch(batch.BatchID).subscribe({
      next: () => { this.getAnimalBatches(); },
      error: () => { alert('Failed to delete batch'); }
    });
  }
}
