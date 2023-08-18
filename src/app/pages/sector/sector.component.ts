import { Component } from '@angular/core';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent {
  constructor(private readonly sectorsService: SectorsService) {}

  public modalShow: boolean = true;

  modalGradientCSS: string[] = ['modal-background'];

  closeFormHandler() {
    this.modalShow = false;
  }
  createJob() {
    this.modalShow = true;

  }



  // public sector = this.sectorsService.getSector('64adaa3f89cb1aa40471f617');

  ngOnInit() {
    // this.sectorsService.getOneSector('64adaa3f89cb1aa40471f617').subscribe((sector) => {
    //   console.log(sector);
    // });
    // this.furnitureService.getFurnitureList().subscribe((furnitureList) => {
    //   furnitureList.forEach((furnitureItem) => {
    //     console.log(furnitureItem._id);
        
    //     this.furnitureListOriginal.push(furnitureItem);
    //     this.furnitureList.push(furnitureItem);
    //   });
    // });
  }
  

  jobList = [
    {
      jobName: 'Delivery of Iron',
      issuer: 'David Mick',
      for: 'Employee 45', 
      created: '24/05/2523',
      due: '27/05/2523',
      status: 'in progress',
      // on hold, completed, issue, cancelled, in progress
      complectedDate: 'Nan',
      note: 'waiting for storage space',
      jobType: 'Delivery',
      // delivery, pickup, storage, repair, maintenance, cleaning, other
      // message: 'dawgidubaw'
    },
  ];
}