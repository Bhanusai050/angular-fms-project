import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html'
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
<<<<<<< HEAD
  isvisible: boolean = false; // Table/grid is default view
  feedData: any[] = [];

=======
  isvisible = false;
  isEditing = false;
  feedData: any[] = [];

  feedTypes: { IdValueID: number, Name: string }[] = [
    // Example static data; replace with API call if needed
    { IdValueID: 1, Name: 'Grass' },
    { IdValueID: 2, Name: 'Grain' },
    { IdValueID: 3, Name: 'Silage' }
  ];

>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feedName: ['', [Validators.required, Validators.maxLength(50)]],
      feedType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      Price: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
    this.getFeedInventory();
  }

  // Helper to refresh grid after CRUD
  getFeedInventory() {
    this.api.getFeedInventory().subscribe({
      next: (data) => {
        this.feedData = data;
      },
      error: () => {
        this.feedData = [];
      }
    });
  }

  onSubmit(): void {
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched();
      return;
    }
    const payload = this.feedForm.value;
    if (payload.feedId) {
      // Edit
      this.api.updateFeedInventory(payload.feedId, payload).subscribe({
        next: () => {
          this.feedForm.reset();
          this.isvisible = false;
          this.getFeedInventory();
        },
        error: () => {
          alert('Failed to update feed inventory');
        }
      });
    } else {
      // Add
      this.api.addFeedInventory(payload).subscribe({
        next: () => {
          this.feedForm.reset();
          this.isvisible = false;
          this.getFeedInventory();
        },
        error: () => {
          alert('Failed to add feed inventory');
        }
      });
    }
<<<<<<< HEAD
=======

    const payload = {
      FeedTypeID: this.feedForm.value.feedType,
      StockQuantity: this.feedForm.value.quantity,
      Price: this.feedForm.value.Price,
      ExpiryDate: this.feedForm.value.expiryDate
    };

    this.feedData.push(payload);
    this.feedForm.reset();
    this.isvisible = false;
>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
  }

  onAdd(): void {
    this.isvisible = true;
    this.feedForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(feed: any): void {
    this.feedForm.patchValue(feed);
    this.isvisible = true;
  }

  onDelete(feed: any): void {
    this.api.deleteFeedInventory(feed.feedId).subscribe({
      next: () => {
        this.getFeedInventory();
      },
      error: () => {
        alert('Failed to delete feed inventory');
      }
    });
  }
}
