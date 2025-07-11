import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html'
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
  isvisible = false;
  feedData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feedId: ['', Validators.required],
      feedType: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      vendor: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      pricePerKg: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched(); // highlight invalid fields
      return; // prevent submission
    }

    this.feedData.push(this.feedForm.value);
    this.feedForm.reset();
    this.isvisible = false;
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
    this.feedData = this.feedData.filter(f => f !== feed);
  }
}
