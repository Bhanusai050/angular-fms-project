import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorForm!: FormGroup;
  VendorData: any[] = [];

  isVisible = false;
  isEditing = false;
  editingIndex: number | null = null;
gstNumber: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      contactName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      gstNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i) ]],
      createdDate:  [new Date(), Validators.required] 
    });
  }

  onAdd(): void {
   
    this.isVisible = true;
    this.isEditing = false;
    this.editingIndex = null;
  }

  onCancel(): void {
  
    this.isVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
  }

  onSubmit(): void {
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    const formData = this.vendorForm.getRawValue();

    if (this.isEditing && this.editingIndex !== null) {
      this.VendorData[this.editingIndex] = formData;
    } else {
      this.VendorData.push(formData);
      this.vendorForm.reset({ purchaseDate: new Date()
      });
      this.isVisible = false;
    }

    this.onCancel();
  }

  onEdit(data: any, index: number): void {
    this.vendorForm.patchValue(data);
    this.isVisible = true;
    this.isEditing = true;
    this.editingIndex = index;
  }

  onDelete(index: number): void {
    this.VendorData.splice(index, 1);

    if (this.isEditing && this.editingIndex === index) {
      this.onCancel();
    }
  }
}


