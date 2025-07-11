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
constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
    // Fetch customers from backend on load
    this.api.getCustomers().subscribe({
      next: (data) => {
        console.log('Backend customer data:', data); // Debug log
        // Map backend fields to frontend fields for display
        this.customerData = data.map((c: any) => ({
          customerId: c.CustomerID,
          name: c.Fullname,
          phone: c.Phonenumber,
          email: c.Email,
          address: c.Location,
          CustomerID: c.CustomerID // keep original for edit/delete
        }));
      },
      error: (err) => {
        console.error('Failed to fetch customers:', err);
        this.customerData = [];
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    const formValue = this.customerForm.value;
    // Map frontend fields to backend property names
    const customerPayload = {
      CustomerID: formValue.customerId,
      Fullname: formValue.name,
      Phonenumber: formValue.phone,
      Email: formValue.email,
      Location: formValue.address
    };
    if (this.isEditing && this.editIndex > -1) {
      // Update customer in backend
      const customerId = this.customerData[this.editIndex]?.CustomerID;
      if (customerId) {
        this.api.updateCustomer(customerId, customerPayload).subscribe({
          next: (res) => {
            this.customerData[this.editIndex] = res;
            this.customerForm.reset();
            this.isvisible = false;
            this.isEditing = false;
            this.editIndex = -1;
          },
          error: (err) => {
            alert('Failed to update customer');
            console.error('API Error:', err);
          }
        });
      } else {
        alert('Customer ID not found for update.');
      }
    } else {
      // Send to backend
      this.api.addCustomer(customerPayload).subscribe({
        next: (res) => {
          this.customerData.push(res);
          this.customerForm.reset();
          this.isvisible = false;
          this.isEditing = false;
          this.editIndex = -1;
        },
        error: (err) => {
          alert('Failed to add customer');
          console.error('API Error:', err);
        }
      });
    }
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.editIndex = -1;
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
    // Patch only frontend fields
    this.customerForm.patchValue({
      customerId: customer.customerId,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address
    });
    this.isvisible = true;
    this.isEditing = true;
  }

  onDelete(customer: any): void {
    const customerId = customer.CustomerID;
    if (customerId) {
      this.api.deleteCustomer(customerId).subscribe({
        next: () => {
          this.customerData = this.customerData.filter(c => c.CustomerID !== customerId);
        },
        error: (err) => {
          alert('Failed to delete customer');
          console.error('API Error:', err);
        }
      });
    } else {
      alert('Customer ID not found for delete.');
    }
  }
}
