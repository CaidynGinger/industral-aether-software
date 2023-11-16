import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ProductionLine } from 'src/app/interfaces/productionLine.interface';
import { ObjectsService } from 'src/app/services/objects.service';
import { ProductionLinesService } from 'src/app/services/production-lines.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  constructor(
    private readonly textService: TextService,
    private readonly objectsService: ObjectsService,
    private readonly productionLinesService: ProductionLinesService,
    private readonly _router: Router
  ) {
    this.addObjectFormGroup.get('input')?.valueChanges.subscribe((newValue) => {
      this.jobDetailsFormGroup?.setValue({
        ...this.jobDetailsFormGroup?.value,
        jobDetails: {
          ...this.jobDetailsFormGroup?.value.jobDetails,
          objectTitle: newValue,
          selectedItemId: this.selectedItemId
        },
      });
    });

    this.addObjectFormGroup
      .get('objectAmount')
      ?.valueChanges.subscribe((newValue) => {
        this.jobDetailsFormGroup?.setValue({
          ...this.jobDetailsFormGroup?.value,
          jobDetails: {
            ...this.jobDetailsFormGroup?.value.jobDetails,
            objectAmount: newValue,

          },
        });
      });
  }

  @Input() jobDetailsFormGroup: FormGroup | undefined;

  ngOnInit() {
    this.productionLinesService.getProductionLineList().subscribe((ProductionList) => {
      ProductionList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
  }

  public inventoryObjectsOriginal: ProductionLine[] = [];
  public inventoryObjectsList: ProductionLine[] = [];
  public inputShowObjectDropdown: Boolean = false;
  public objectUnit: string = '';
  public selectedItemId: string = '';

  public addObjectFormGroup = new FormGroup({
    input: new FormControl<any>(null),
    objectAmount: new FormControl<any>(null),
  });

  public inputDropDownActive() {
    this.inputShowObjectDropdown = true;
  }

  public onSearchObjectList() {
    this.inventoryObjectsList = this.inventoryObjectsOriginal.filter((object) =>
      object.productionLineTitle
        .toLowerCase()
        .includes(this.addObjectFormGroup.controls.input.value.toLowerCase())
    );
  }

  public SelectObjectInputsHandler(objectId: string) {
    this.inputShowObjectDropdown = false;
    this.selectedItemId = objectId;
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );

    // console.log(objectSelected?.objectTitle);
    this.addObjectFormGroup.setValue({
      input: objectSelected?.productionLineTitle,
      objectAmount: this.addObjectFormGroup.value.objectAmount,
    });
  }

  public dropDownNonActive() {
    setTimeout(() => {
      this.inputShowObjectDropdown = false;
      // this.addObjectFormGroup.reset();
      // this.addOutputFormGroup.reset();
      // this.outputShowObjectDropdown = false;
      this.inventoryObjectsList = this.inventoryObjectsOriginal;
    }, 100);
  }
}
