import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent {

  constructor(
    private readonly objectService: ObjectsService
  ) {}

  @Input() selectedObject: ObjectItem = {
    _id: '',
    objectTitle: '',
    unit: '',
    amount: 0,
  }

  @Output() closeFormHandler = new EventEmitter();

  deleteInventoryObjectHandler() {
    this.objectService.deleteObject(this.selectedObject._id).subscribe((data) => {      
      console.log('Success!', data);
      this.closeFormHandler.emit()
    }
    );

  }

  editObjectFormGroup = new FormGroup({
    _id: new FormControl<any>(this.selectedObject._id),
    objectTitle: new FormControl<any>(this.selectedObject.objectTitle),
    unit: new FormControl<any>(this.selectedObject.unit),
  });

  // update editObjectFormGroup when selected object changes
  ngOnChanges() {
    this.editObjectFormGroup.setValue({
      _id: this.selectedObject._id,
      objectTitle: this.selectedObject.objectTitle,
      unit: this.selectedObject.unit,
    });
  }

  onSubmit() {
    console.log('editObjectFormGroup', this.editObjectFormGroup.value);
    
    this.objectService.updateObject(this.editObjectFormGroup.value).subscribe((data) => {
      console.log('Success!', data);
      this.editObjectFormGroup.reset();
      this.closeFormHandler.emit()
    }, (error) => {
      console.log('Error', error);
    }
    
    );

  }
}
