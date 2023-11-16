import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.scss']
})
export class EditSectorComponent implements OnChanges {
  constructor(private readonly sectorService: SectorsService,
    private readonly router: Router) {}

  addSectorFormGroup = new FormGroup({
    title: new FormControl<any>(''),
    locationX: new FormControl<any>(''),
    locationY: new FormControl<any>(''),
    locationZ: new FormControl<any>(''),
  });

  // function to take the form data and send it to the service

  @Input() sectorId: string = ''; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectorId'] && !changes['sectorId'].firstChange) {
      // The sectorId input has changed, and it's not the initial change
      // Perform your data refresh logic here, e.g., make a new HTTP request
      // to update the modal content based on the new sectorId.
      this.refreshData();
    }
  }

  refreshData() {
    this.sectorService.getOneSector(this.sectorId).subscribe((sector) => {
      console.log(sector);
      this.addSectorFormGroup = new FormGroup({
        title: new FormControl<any>(sector.title),
        locationX: new FormControl<any>(sector.locationX),
        locationY: new FormControl<any>(sector.locationY),
        locationZ: new FormControl<any>(sector.locationZ),
      });
    });
  }

  onSubmit() {
    this.sectorService.createSector(this.addSectorFormGroup.value).subscribe(
      (data) => {
        console.log('Success!', data);
        this.router.navigate(['/sector', data['_id']]);
        this.addSectorFormGroup.reset();
      }
    );
  }
}
