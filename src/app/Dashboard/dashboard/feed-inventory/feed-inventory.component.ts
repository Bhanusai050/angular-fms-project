import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html'
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
  isvisible: boolean = false; // Table/grid is default view
  feedData: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feedId: ['', Validators.required],
      feedType: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      vendor: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      pricePerKg: ['', [Validators.required, Validators.min(0)]]
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
