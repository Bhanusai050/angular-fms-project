import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  isvisible = false;
  isEditing: boolean = false;
  editIndex: number = -1;
  customerData: any[] = [];

  constructor(private fb: FormBuilder, @Inject(ApiService) private api: ApiService) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    if (this.isEditing && this.editIndex > -1) {
      this.customerData[this.editIndex] = this.customerForm.value;
    } else {
      this.api.addCustomer(this.customerForm.value).subscribe({
        next: (res: any) => {
          alert('Customer added successfully!');
          this.customerData.push(res);
          this.customerForm.reset();
          this.isvisible = false;
        },
        error: (err: any) => {
          alert('Failed to add customer');
          console.error('API Error:', err);
        }
      });
    }
    this.isEditing = false;
    this.editIndex = -1;
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.customerForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
    this.isEditing = false;
    this.editIndex = -1;
  }

  onEdit(customer: any): void {
    const index = this.customerData.indexOf(customer);
    this.editIndex = index;
    this.customerForm.patchValue(customer);
    this.isvisible = true;
    this.isEditing = true;
  }

  onDelete(customer: any): void {
    const index = this.customerData.indexOf(customer);
    if (index > -1) {
      this.customerData.splice(index, 1);
    }
  }
}
