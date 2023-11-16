import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sector } from 'src/app/interfaces/sector.interface';
import { JobsService } from 'src/app/services/jobs.service';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-inventory-sectors',
  templateUrl: './inventory-sectors.component.html',
  styleUrls: ['./inventory-sectors.component.scss'],
})
export class InventorySectorsComponent {
  constructor(
    private _router: Router,
    private readonly sectorService: SectorsService,
    private readonly jobsService: JobsService,
  ) {}

  public sectorListOriginal: Sector[] = [];
  public sectorList: Sector[] = [];

  editModalShow: boolean = false;
  addModalShow: boolean = false;
  modalModalBackground: boolean = false;

  modalGradientCSS: string[] = ['modal-background'];

  public selectedEditSectorId = '';

  public TotalJobs: number = 0;

  ngOnInit() {
    this.getSectorList()
    // add all jobs together 
    
  }

  getSectorList() {
    this.sectorListOriginal = [];
    this.sectorList = [];
    this.sectorService.getSectorList().subscribe((sectorList) => {
      sectorList.forEach((sector) => {
        this.sectorListOriginal.push(sector);
        this.sectorList.push(sector);
        this.TotalJobs += sector.jobs.length;
      });
    });
  }

  

  closeFormHandler() {
    this.addModalShow = false;
    this.editModalShow = false
    this.modalModalBackground = false;
  }
  addNewSectorModalHandler() {
    this.addModalShow = true;
    this.modalModalBackground = true;
  }
  routeHandler(id: string) {
    this._router.navigate(['/sector', id]);
  }

  onDeleteItem(event: Event , id: string) {
    event.stopPropagation();
    this.sectorService.deleteSector(id).subscribe((data) => {
      console.log('Success!', data);
      this.getSectorList();
    });
  }

  onEditItem(event: Event , id: string) {
    event.stopPropagation();
    // this._router.navigate(['/sector', id, 'edit']);
    this.selectedEditSectorId = id
    this.editModalShow = true;
    this.modalModalBackground = true;
  }
}
