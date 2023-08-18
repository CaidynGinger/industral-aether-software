import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ProductionLine } from 'src/app/interfaces/productionLine.interface';
import { ObjectsService } from 'src/app/services/objects.service';
import { ProductionLinesService } from 'src/app/services/production-lines.service';

@Component({
  selector: 'app-production-line',
  templateUrl: './production-line.component.html',
  styleUrls: ['./production-line.component.scss']
})
export class ProductionLineComponent {
  constructor(
    private readonly objectService: ObjectsService,
    private readonly productionLineService: ProductionLinesService
  ) {}

  public inventoryObjectsOriginal: ObjectItem[] = [];
  public inventoryObjectsList: ObjectItem[] = [];
  public inputShowObjectDropdown: Boolean = false;
  public outputShowObjectDropdown: Boolean = false;

  @Input() selectedProductionLine: ProductionLine = {
    _id: '',
    productionLineTitle: '',
    productionLineInputs: [],
    productionLineOutputs: [],
  }

  @Output() closeFormHandler = new EventEmitter();

  ngOnInit() {
    this.objectService.getObjectList().subscribe((ObjectList) => {
      ObjectList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
    console.log(this.editProductionLineFormGroup.value);
    
  }

  ngOnChanges() {
    this.editProductionLineFormGroup.setValue({
      _id: this.selectedProductionLine._id,
      productionLineTitle: this.selectedProductionLine.productionLineTitle,
      productionLineInputs: this.selectedProductionLine.productionLineInputs,
      productionLineOutputs: this.selectedProductionLine.productionLineOutputs,
    });
    console.log(this.editProductionLineFormGroup.value);
  }

  public editProductionLineFormGroup = new FormGroup({
    _id: new FormControl<any>(this.selectedProductionLine._id),
    productionLineTitle: new FormControl<any>(this.selectedProductionLine.productionLineTitle),
    productionLineInputs: new FormControl<any>(this.selectedProductionLine.productionLineInputs),
    productionLineOutputs: new FormControl<any>(this.selectedProductionLine.productionLineOutputs),
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
      this.editProductionLineFormGroup.controls.productionLineInputs.value.find(
        (object: { _id: string }) => object._id === objectId
      );
    objectSelected.amount = event.target.value;
  }

  public updateProductionLineAmountOutput(event: any, objectId: string) {
    const objectSelected =
      this.editProductionLineFormGroup.controls.productionLineOutputs.value.find(
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
    this.editProductionLineFormGroup.controls.productionLineInputs.value.push(
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
    this.editProductionLineFormGroup.controls.productionLineOutputs.value.push(
      objectSelected
    );
    // this.inventoryObjectsList = this.inventoryObjectsOriginal;
  }

  removeObject(objectId: string) {
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.editProductionLineFormGroup.controls.productionLineInputs.value.splice(
      this.editProductionLineFormGroup.controls.productionLineInputs.value.indexOf(
        objectSelected
      ),
      1
    );
  }
  removeObjectOutputs(objectId: string) {
    const objectSelected = this.inventoryObjectsOriginal.find(
      (object) => object._id === objectId
    );
    this.editProductionLineFormGroup.controls.productionLineOutputs.value.splice(
      this.editProductionLineFormGroup.controls.productionLineOutputs.value.indexOf(
        objectSelected
      ),
      1
    );
  }

  onRemoveProductionLine() {
    this.productionLineService.deleteProductionLine(this.editProductionLineFormGroup.value._id).subscribe((data) => {
      console.log('Success!', data);
      this.closeFormHandler.emit();
      this.editProductionLineFormGroup.value.productionLineInputs.length = 0;
      this.editProductionLineFormGroup.value.productionLineOutputs.length = 0;
      this.editProductionLineFormGroup.controls.productionLineTitle.reset();
      return;
    });
  }


  onSubmit() {
    this.productionLineService
      .updateProductionLine(this.editProductionLineFormGroup.value)
      .subscribe((data) => {
        console.log('Success!', data);
        this.closeFormHandler.emit();
        this.editProductionLineFormGroup.value.productionLineInputs.length = 0;
        this.editProductionLineFormGroup.value.productionLineOutputs.length = 0;
        this.editProductionLineFormGroup.controls.productionLineTitle.reset();
        return;
      });

  }
}
