import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss'],
})
export class AddObjectComponent {
  constructor(
    private readonly router: Router,
    private readonly objectService: ObjectsService
  ) {}

  addObjectFormGroup = new FormGroup({
    objectTitle: new FormControl<any>(''),
    unit: new FormControl<any>(''),
  });

  onSubmit() {
    this.objectService
      .createObject(this.addObjectFormGroup.value)
      .subscribe((data) => {
        console.log('Success!', data);
        this.addObjectFormGroup.reset();
        this.router.navigate(['/object', '64adaa3f89cb1aa40471f617']);
        return;
      });
  }
}
