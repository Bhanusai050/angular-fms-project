import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {
  investmentForm!: FormGroup;
  investments: any[] = [];
  isvisible = false;
  isEditing = false;
  editIndex = -1;
  todayString: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.investmentForm = this.fb.group({
      date: [this.todayString, Validators.required],
      capitalAmount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.maxLength(100)]
    });
  }

  onSubmit() {
    if (this.investmentForm.valid) {
      const formValue = this.investmentForm.value;
      if (this.isEditing && this.editIndex > -1) {
        this.investments[this.editIndex] = formValue;
        alert('Investment updated!');
        this.isEditing = false;
      } else {
        this.investments.push(formValue);
        alert('Investment added!');
      }
      this.investmentForm.reset({ date: this.todayString });
      this.isvisible = false;
    }
  }

  onAdd() {
    this.isvisible = true;
    this.isEditing = false;
    this.investmentForm.reset({ date: this.todayString });
  }

  onCancel() {
    this.isvisible = false;
  }

  onEdit(investment: any) {
    this.editIndex = this.investments.indexOf(investment);
    this.investmentForm.patchValue(investment);
    this.isvisible = true;
    this.isEditing = true;
  }

  onDelete(investment: any) {
    const index = this.investments.indexOf(investment);
    if (index > -1) {
      this.investments.splice(index, 1);
    }
  }
}
