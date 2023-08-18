import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ObjectsService } from 'src/app/services/objects.service';
import { ProductionLinesService } from 'src/app/services/production-lines.service';

@Component({
  selector: 'app-add-production-line',
  templateUrl: './add-production-line.component.html',
  styleUrls: ['./add-production-line.component.scss'],
})
export class AddProductionLineComponent {
  constructor(
    private readonly objectService: ObjectsService,
    private readonly productionLineService: ProductionLinesService
  ) {}

  public inventoryObjectsOriginal: ObjectItem[] = [];
  public inventoryObjectsList: ObjectItem[] = [];
  public inputShowObjectDropdown: Boolean = false;
  public outputShowObjectDropdown: Boolean = false;

  ngOnInit() {
    this.objectService.getObjectList().subscribe((ObjectList) => {
      ObjectList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
  }

  public addProductionLineFormGroup = new FormGroup({
    productionLineTitle: new FormControl<any>(''),
    productionLineInputs: new FormControl<any>([]),
    productionLineOutputs: new FormControl<any>([]),
  });

  public addInputFormGroup = new FormGroup({
    inputTitle: new FormControl<any>(''),
  });

  public addOutputFormGroup = new FormGroup({
    outputTitle: new FormControl<any>(''),
  });

  public inputDropDownActive() {
    this.inputShowObjectDropdown = true;
  }

  public outputDropDownActive() {
    this.outputShowObjectDropdown = true;
  }

  public onSearchObjectList() {
    this.inventoryObjectsList = this.inventoryObjectsOriginal.filter((object) =>
      object.objectTitle
        .toLowerCase()
        .includes(
          this.addInputFormGroup.controls.inputTitle.value.toLowerCase()
        )
    );
  }

  public onSearchObjectListOutput() {
    this.inventoryObjectsList = this.inventoryObjectsOriginal.filter((object) =>
      object.objectTitle
        .toLowerCase()
        .includes(
          this.addOutputFormGroup.controls.outputTitle.value.toLowerCase()
        )
    );
  }

  public dropDownNonActive() {
    setTimeout(() => {
      this.inputShowObjectDropdown = false;
      this.addInputFormGroup.reset();
      this.addOutputFormGroup.reset();
      this.outputShowObjectDropdown = false;
      this.inventoryObjectsList = this.inventoryObjectsOriginal;
    }, 100);
  }

  public updateProductionLineAmountInput(event: any, objectId: string) {
    const objectSelected =
      this.addProductionLineFormGroup.controls.productionLineInputs.value.find(
        (object: { _id: string }) => object._id === objectId
      );
    objectSelected.amount = event.target.value;
  }

  public updateProductionLineAmountOutput(event: any, objectId: string) {
    const objectSelected =
      this.addProductionLineFormGroup.controls.productionLineOutputs.value.find(
        (object: { _id: string }) => object._id === objectId
      );
    objectSelected.amount = event.target.value;
  }

  public SelectObjectInputsHandler(objectId: string) {
    this.inputShowObjectDropdown = false;
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.addInputFormGroup.reset();
    this.addProductionLineFormGroup.controls.productionLineInputs.value.push(
      objectSelected
    );
    // this.inventoryObjectsList = this.inventoryObjectsOriginal;
  }

  public SelectObjectOutputsHandler(objectId: string) {
    this.outputShowObjectDropdown = false;
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.addOutputFormGroup.reset();
    this.addProductionLineFormGroup.controls.productionLineOutputs.value.push(
      objectSelected
    );
    // this.inventoryObjectsList = this.inventoryObjectsOriginal;
  }

  removeObject(objectId: string) {
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.addProductionLineFormGroup.controls.productionLineInputs.value.splice(
      this.addProductionLineFormGroup.controls.productionLineInputs.value.indexOf(
        objectSelected
      ),
      1
    );
  }
  removeObjectOutputs(objectId: string) {
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.addProductionLineFormGroup.controls.productionLineOutputs.value.splice(
      this.addProductionLineFormGroup.controls.productionLineOutputs.value.indexOf(
        objectSelected
      ),
      1
    );
  }

  onSubmit() {
    console.log(this.addProductionLineFormGroup.value);

    this.productionLineService
      .createProductionLine(this.addProductionLineFormGroup.value)
      .subscribe((data) => {
        console.log('Success!', data);
        this.addProductionLineFormGroup.value.productionLineInputs.length = 0;
        this.addProductionLineFormGroup.value.productionLineOutputs.length = 0;
        this.addProductionLineFormGroup.controls.productionLineTitle.reset();
        return;
      });
  }
}
