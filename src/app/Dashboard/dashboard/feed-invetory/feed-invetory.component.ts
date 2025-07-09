import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-invetory',
  templateUrl: './feed-invetory.component.html',
  styleUrls: ['./feed-invetory.component.scss']
})
export class FeedInvetoryComponent  implements OnInit {
   feedInventoryForm! : FormGroup;

  openAddDialog() {
   throw new Error('Method not implemented.');
  }
  onEdit(_t24: any) {
  throw new Error('Method not implemented.');
  }
  FeedInvetoryData: any= [];
  isvisible:boolean=false;
  record: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit() 
  {
  this.feedInventoryForm =this.fb.group({
  feedID: ['',Validators.required],
  feedType: ['',Validators.required],
  stockQuantity: [0, [Validators.required,Validators.min(0)]],
  unit: [0, [Validators.required,Validators.min(0)]],
  expiryDate: [new Date(), Validators.required]
  });
      
  }
  onSubmit() {
    if (this.feedInventoryForm.valid){
    this.FeedInvetoryData.push(this.feedInventoryForm.value);
    console.log(this.feedInventoryForm.value);
    this.feedInventoryForm.reset({ expiryDate: new Date(), stockQuantity: 0, unit: 0});
    
    }
    
    else{
    this.feedInventoryForm.markAllAsTouched();
    }
  }
    onAdd()
    {
    this.isvisible=true;
    this.feedInventoryForm.reset();
    }
    oncancel()
    {
     this.isvisible=false;
    }
  }
