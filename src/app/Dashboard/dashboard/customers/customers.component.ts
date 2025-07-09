import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  isvisible = false;
  customerData: any[] = [];

  constructor(private fb: FormBuilder) {}

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

    this.customerData.push(this.customerForm.value);
    this.customerForm.reset();
    this.isvisible = false;
  }

  onAdd(): void {
    this.isvisible = true;
    this.customerForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(customer: any): void {
    this.customerForm.patchValue(customer);
    this.isvisible = true;
  }

  onDelete(customer: any): void {
    this.customerData = this.customerData.filter(c => c !== customer);
  }
}
