import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent {
  public jobFormGroup = new FormGroup({
    jobTitle: new FormControl<any>(''),
    jobType: new FormControl<any>(''),
  });

  public jobTypes = ['Production', 'Export', 'Import', 'Stock Update'];

  public inputShowObjectDropdown = false;

  inputDropDownActive() {
    this.inputShowObjectDropdown = true;
  }
  dropDownNonActive() {
    setTimeout(() => {
      this.inputShowObjectDropdown = false;
    }, 100);
  }
  SelectJobTypeHandler(jobType: string) {
    this.jobFormGroup.controls.jobType.setValue(jobType);
  }
}
