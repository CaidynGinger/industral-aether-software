import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sector } from 'src/app/interfaces/sector.interface';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-inventory-sectors',
  templateUrl: './inventory-sectors.component.html',
  styleUrls: ['./inventory-sectors.component.scss'],
})
export class InventorySectorsComponent {
  constructor(
    private _router: Router,
    private readonly sectorService: SectorsService
  ) {}

  public sectorListOriginal: Sector[] = [];
  public sectorList: Sector[] = [];

  ngOnInit() {
    this.getSectorList()
  }

  getSectorList() {
    this.modalShow = false;
    this.sectorListOriginal = [];
    this.sectorList = [];
    this.sectorService.getSectorList().subscribe((sectorList) => {
      sectorList.forEach((sector) => {
        this.sectorListOriginal.push(sector);
        this.sectorList.push(sector);
      });
      console.log(this.sectorList);
    });
  }

  modalShow: boolean = false;

  modalGradientCSS: string[] = ['modal-background'];

  closeFormHandler() {
    this.modalShow = false;
  }
  addSectorHandler() {
    this.modalShow = true;
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
}

// Alnotov
// Koseuliv
// Galnars
// Ugnagua
// Liter
// Cuanus
// Cizinerth
// Gusinus
// Chypso 9U75
// Corix 0Z5P
