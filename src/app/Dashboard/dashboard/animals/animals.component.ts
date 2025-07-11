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
  AnimalsData: any = [];
  isvisible: boolean = false;
  isEditing: boolean = false;
  editIndex: number = -1;
  record: any;
  todayString: string = new Date().toISOString().split('T')[0];

  animalTypes = [
    { id: 1, name: 'Sheep' },
    { id: 2, name: 'Goat' },
    { id: 3, name: 'Hen' },
    { id: 4, name: 'Buffalo' },
    { id: 5, name: 'Cow' }
  ];
  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];
  healthStatuses = [
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Healthy' },
    { id: 3, name: 'Injured' },
    { id: 4, name: 'Recovering' }
  ];
  animalStatuses = [
    { id: 1, name: 'Death' },
    { id: 2, name: 'Sold' },
    { id: 3, name: 'Active' }
  ];
  vendors = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' }
    // Add real vendor data here
  ];
  batches = [
    { id: 1, name: 'Batch 1' },
    { id: 2, name: 'Batch 2' }
    // Add real batch data here
  ];

  constructor(private fb: FormBuilder, @Inject(ApiService) private api: ApiService) {}

  ngOnInit() {
    this.animalForm = this.fb.group({
      animalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z ]+$')]],
      batchId: [null, [Validators.required]],
      animalType: [null, Validators.required],
      gender: [null, Validators.required],
      healthStatus: [null, Validators.required],
      animalCost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      venderName: [null, Validators.required],
      animalStatus: [null, Validators.required],
      purchaseDate: [this.todayString, Validators.required]
    });
    // Fetch animals from backend on load
    this.api.getAnimals().subscribe({
      next: (data) => {
        this.AnimalsData = data;
      },
      error: (err) => {
        console.error('Failed to fetch animals:', err);
        this.AnimalsData = [];
      }
    });
  }

  onSubmit() {
    const formatDate = (date: any) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    };
    if (this.animalForm.valid) {
      const formValue = this.animalForm.value;
      const animalPayload = {
        AnimalName: formValue.animalName,
        AnimalTypeID: formValue.animalType, // ID
        BatchID: formValue.batchId,         // ID
        GenderID: formValue.gender,         // ID
        HealthStatusID: formValue.healthStatus, // ID
        AnimalCost: formValue.animalCost,
        VendorID: formValue.venderName,     // ID
        AnimalStatusID: formValue.animalStatus, // ID
        AnimalPurchasedDate: formatDate(formValue.purchaseDate),
        BirthDate: null
      };
      if (this.isEditing && this.editIndex > -1) {
        // Use the correct ID for update
        const animalId = this.AnimalsData[this.editIndex]?.AnimalID;
        if (animalId) {
          this.api.updateAnimal(animalId, animalPayload).subscribe({
            next: (res: any) => {
              this.AnimalsData[this.editIndex] = res;
              alert('Animal updated successfully!');
              this.animalForm.reset({ purchaseDate: this.todayString, animalCost: 0 });
              this.isvisible = false;
              this.isEditing = false;
            },
            error: (err: any) => {
              alert('Failed to update animal');
              console.error('API Error:', err);
            }
          });
        } else {
          alert('Animal ID not found for update.');
        }
      } else {
        this.api.addAnimal(animalPayload).subscribe({
          next: (res: any) => {
            alert('Animal added successfully!');
            this.AnimalsData.push(res);
            this.animalForm.reset({ purchaseDate: this.todayString, animalCost: 0 });
            this.isvisible = false;
          },
          error: (err: any) => {
            alert('Failed to add animal');
            console.error('API Error:', err);
          }
        });
      }
    }
  }
  
    onAdd()
    {
          this.isvisible=true;
          this.isEditing=false;
          this.animalForm.reset({ purchaseDate: this.todayString, animalCost: 0 });
    }
    oncancel()
    {
      this.isvisible=false;
    }

    onEdits(animal: any): void {
      this.editIndex = this.AnimalsData.indexOf(animal);
      this.animalForm.patchValue({
        animalName: animal.AnimalName,
        batchId: animal.BatchID,
        animalType: animal.AnimalTypeID,
        gender: animal.GenderID,
        healthStatus: animal.HealthStatusID,
        animalCost: animal.AnimalCost,
        venderName: animal.VendorID,
        animalStatus: animal.AnimalStatusID,
        purchaseDate: animal.AnimalPurchasedDate
      });
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

  getAnimalTypeName(id: number): string {
    const type = this.animalTypes.find(t => t.id === id);
    return type ? type.name : String(id);
  }
  getGenderName(id: number): string {
    const gender = this.genders.find(g => g.id === id);
    return gender ? gender.name : String(id);
  }
  getHealthStatusName(id: number): string {
    const health = this.healthStatuses.find(h => h.id === id);
    return health ? health.name : String(id);
  }
  getAnimalStatusName(id: number): string {
    const status = this.animalStatuses.find(s => s.id === id);
    return status ? status.name : String(id);
  }
  getVendorName(id: number): string {
    const vendor = this.vendors.find(v => v.id === id);
    return vendor ? vendor.name : String(id);
  }
}




