import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

export interface CustomerApiResponse {
  CustomerID: number;
  FullName: string;
  PhoneNumber: string;
  Email: string;
  Location: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  isvisible: boolean = false; // Table/grid is default view
  isEditing: boolean = false;
  editIndex: number = -1;
  customerData: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      FullName: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
    this.getCustomers();
  }

  getCustomers() {
    this.api.getCustomers().subscribe({
<<<<<<< HEAD
      next: (data) => {
        // Map backend fields to frontend fields for display
        this.customerData = data.map((c: any) => ({
=======
      next: (data: CustomerApiResponse[]) => {
        this.customerData = data.map((c) => ({
>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
          customerId: c.CustomerID,
          FullName: c.FullName,
          PhoneNumber: c.PhoneNumber,
          email: c.Email,
          address: c.Location,
          CustomerID: c.CustomerID
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
      FullName: formValue.FullName,
      PhoneNumber: formValue.PhoneNumber,
      Email: formValue.email,
      Location: formValue.address
    };
    if (this.isEditing && this.editIndex > -1) {
      // Update customer in backend
      const customerId = this.customerData[this.editIndex]?.CustomerID;
      if (customerId) {
        this.api.updateCustomer(customerId, customerPayload).subscribe({
<<<<<<< HEAD
          next: (res) => {
=======
          next: (res: CustomerApiResponse) => {
            this.customerData[this.editIndex] = {
              customerId: res.CustomerID,
              FullName: res.FullName,
              PhoneNumber: res.PhoneNumber,
              email: res.Email,
              address: res.Location,
              CustomerID: res.CustomerID
            };
>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
            this.customerForm.reset();
            this.isvisible = false;
            this.isEditing = false;
            this.editIndex = -1;
            this.getCustomers(); // Refresh grid after edit
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
      this.api.addCustomer(customerPayload).subscribe({
<<<<<<< HEAD
        next: (res) => {
=======
        next: (res: CustomerApiResponse) => {
          this.customerData.push({
            customerId: res.CustomerID,
            FullName: res.FullName,
            PhoneNumber: res.PhoneNumber,
            email: res.Email,
            address: res.Location,
            CustomerID: res.CustomerID
          });
>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
          this.customerForm.reset();
          this.isvisible = false;
          this.isEditing = false;
          this.editIndex = -1;
          this.getCustomers(); // Refresh grid after add
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
      FullName: customer.FullName,
      PhoneNumber: customer.PhoneNumber,
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
          alert('Customer deleted successfully!');
          this.getCustomers(); // Refresh grid after delete
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
