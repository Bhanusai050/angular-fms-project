import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  isvisible = false;
  orderForm: FormGroup;
  ordersData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
  order: ['', Validators.required],
  customerName: ['', Validators.required],
  orderDate: ['', Validators.required],
  paymentStatus: ['', [Validators.required, Validators.pattern(/^(Completed|Pending|Failed)$/i)]],
  orderStatus: ['', [Validators.required, Validators.pattern(/^(Confirmed|Pending|Cancelled)$/i)]],
  production: ['', [Validators.required,Validators.pattern(/^(milk|egg|meat)$/i)]],
  quantity: ['', [Validators.required, Validators.min(1)]],
  unitPrice: ['', [Validators.required, Validators.min(0)]],
  totalAmount: ['', [Validators.required, Validators.min(0)]]
    });
  }
  onEdit(order: any): void {
  this.orderForm.patchValue(order);
  this.isvisible = true;
}

  onDelete(order: any): void {
  if (confirm(`Are you sure you want to delete Order ID: ${order.orderId}?`)) {
    this.ordersData = this.ordersData.filter(o => o !== order);
  }
}

  onAdd() {
    this.isvisible = true;
    this.orderForm.reset();
  }

  oncancel() {
    this.isvisible = false;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order = this.orderForm.value;
      order.totalAmount = order.quantity * order.unitPrice;
      this.ordersData.push(order);
      this.orderForm.reset();
      this.isvisible = false;
    }
  }
}
