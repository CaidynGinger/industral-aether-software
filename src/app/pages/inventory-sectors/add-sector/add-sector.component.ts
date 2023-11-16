import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.scss'],
})
export class AddSectorComponent {
  constructor(private readonly sectorService: SectorsService,
    private readonly router: Router) {}

  addSectorFormGroup = new FormGroup({
    title: new FormControl<any>(''),
    locationX: new FormControl<any>(''),
    locationY: new FormControl<any>(''),
    locationZ: new FormControl<any>(''),
  });

  // function to take the form data and send it to the service

  onSubmit() {
    // 64adaa3f89cb1aa40471f617
    this.sectorService.createSector(this.addSectorFormGroup.value).subscribe(
      (data) => {
        console.log('Success!', data);
        this.router.navigate(['/sector', data['_id']]);
        this.addSectorFormGroup.reset();
      }
    );
  }
}
