import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-Animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  animalForm!: FormGroup;
  // Removed unimplemented openAddDialog and onEdit methods



AnimalsData: any= [];
isvisible:boolean=false;
isEditing: boolean = false;
editIndex: number = -1;

record: any;


  constructor(private fb: FormBuilder, @Inject(ApiService) private api: ApiService) {}

  ngOnInit() {
    this.animalForm = this.fb.group({
      animalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^[A-Za-z ]+$')]],
      batchId: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      animalType: ['',Validators.required],
      gender: [null,Validators.required],
      healthStatus:[' ',Validators.required],
      animalCost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      venderName: [' ',[Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^[A-Za-z ]+$')]],
      animalStatus: [' ',Validators.required],
      purchaseDate: [new Date(), Validators.required]  
    });
  }
  
  onSubmit() {
    if (this.animalForm.valid){
      const formData = this.animalForm.getRawValue();

      if (this.isEditing && this.editIndex > -1)
      {
     
      console.log(this.animalForm.value)
      
      
      this.AnimalsData[this.editIndex] = this.animalForm.value;
    }
    else{
      this.AnimalsData.push(this.animalForm.value);
    
    }
      this.animalForm.reset({ purchaseDate: new Date(), animalCost: 0, quantity: 0});
      this.isvisible = false;
    }
    if (this.isEditing && this.editIndex > -1) {
      // Update local data only
      this.AnimalsData[this.editIndex] = this.animalForm.value;
    } else {
      // 🌐 Send data to the API
      this.api.addAnimal(this.animalForm.value).subscribe({
        next: (res: any) => {
          alert('Animal added successfully!');
          console.log('API Response:', res);
          this.animalForm.markAllAsTouched();

          // Add to local list (optional if API returns new data)
          this.AnimalsData.push(res);

          this.animalForm.reset({ purchaseDate: new Date(), animalCost: 0, quantity: 0 });
          this.isvisible = false;
        },
        error: (err: any) => {
          alert('Failed to add animal');
          console.error('API Error:', err);
        }
        
      });
    }
  
    }

    onAdd()
    {
          this.isvisible=true;
          this.isEditing=false;
          this.animalForm.reset();
    }
    oncancel()
    {
      this.isvisible=false;
    }

    onEdits(animal: any): void {
      const index = this.AnimalsData.indexOf(animal);
      this.editIndex = index;
      this.animalForm.patchValue(animal);
      this.isvisible = true;
      this.isEditing = true;
     }

      onDelete(animal: any): void {
      const index = this.AnimalsData.indexOf(animal);
      if (index > -1) {
      this.AnimalsData.splice(index, 1);
    }
  }

  // animals.component.ts
   digitsOnly(event: KeyboardEvent): void {
  const allowedKeys = [
    'Backspace',  // delete last character
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', // navigation
    'Tab', 'Delete',
    'Enter'       // let the Enter key through
  ];

  // Allow Ctrl/⌘ + C / V / A / X combos
  if (event.ctrlKey || event.metaKey) {
    return;
  }

  // Allow the keys in the list above
  if (allowedKeys.includes(event.key)) {
    return;
  }

  // Block anything that is not 0‑9
  const isDigit = /^[0-9]$/.test(event.key);
  if (!isDigit) {
    event.preventDefault();
  }
}
}




    