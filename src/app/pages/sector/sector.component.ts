import { Component } from '@angular/core';
import { JobItem } from 'src/app/interfaces/job.interface';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { Sector } from 'src/app/interfaces/sector.interface';
import { JobsService } from 'src/app/services/jobs.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent {
  constructor(
    private readonly textService: TextService,
    private readonly sectorsService: SectorsService,
    private readonly jobsService: JobsService,
  ) {}

  public modalShow: boolean = false;

  modalGradientCSS: string[] = ['modal-background'];

  closeFormHandler() {
    this.modalShow = false;
  }
  createJob() {
    this.modalShow = true;
  }

  public jobList: JobItem[] = [];
  public jobListCompleted: JobItem[] = [];
  public jobListIncomplete: JobItem[] = [];
  public jobListOriginal: JobItem[] = [];
  public sectorInventory: ObjectItem[] = [];

  public SectorDetails: Sector | undefined;


  // get sectorId from router
  public sectorId = window.location.pathname.split('/')[2];

  // public sector = this.sectorsService.getSector('64adaa3f89cb1aa40471f617');

  ngOnInit() {
    this.jobsService
      .getJobList(this.sectorId)
      .subscribe((ProductionLineList: JobItem[]) => {
        ProductionLineList.forEach((ProductionLine: JobItem) => {
          this.jobListOriginal.push(ProductionLine);
          this.jobList.push(ProductionLine);
        });
        console.log(this.jobList);

        // filter job list for incomplet jobs

        this.jobListIncomplete = this.jobList.filter((job) => {
          return job.status !== 'completed';
        });

        // filter job list for complete jobs

        this.jobListCompleted = this.jobList.filter((job) => {
          return job.status === 'completed';
        });

      });

      this.sectorsService.getOneSector(this.sectorId).subscribe((sector) => {
        console.log(sector);
        this.SectorDetails = sector;
      });
      

      this.sectorsService.getInventory(this.sectorId).subscribe((inventory) => {
        console.log(inventory);
        this.sectorInventory = inventory;
      }
      );
  }

  onDeleteJob(jobId: string) {
    this.jobsService.deleteJob(jobId).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }

  onCompleteJob(jobId: string, sectorId: string) {
    this.jobsService.completeJob(jobId, sectorId).subscribe(
      (data) => {
        console.log(data);
        location.reload();
      },
      (error) => {
        console.error(error);
        alert('An error occurred while completing the job. Please try again. \n' + error.error.message);
      }
    );
  }
  toCapitalize(text: string) {
    return this.textService.firstWordInSentenceToUppercase(text);
  }
  
  pluralChecker(number: number) {
    if (+number > 1) {
      return '';
    }
    return 's';
  }
}


