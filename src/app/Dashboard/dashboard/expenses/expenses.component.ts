import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  isvisible = false;
  expensesData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      expenseId: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      paymentMode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    this.expensesData.push(this.expenseForm.value);
    this.expenseForm.reset();
    this.isvisible = false;
  }

  onAdd(): void {
    this.isvisible = true;
    this.expenseForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(expense: any): void {
    this.expenseForm.patchValue(expense);
    this.isvisible = true;
  }

  onDelete(expense: any): void {
    this.expensesData = this.expensesData.filter(e => e !== expense);
  }
}
