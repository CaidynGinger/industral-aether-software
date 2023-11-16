import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ObjectsService } from 'src/app/services/objects.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {
  constructor(
    private readonly textService: TextService,
    private readonly objectsService: ObjectsService,
    private readonly _router: Router
  ) {
    this.addObjectFormGroup.get('input')?.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      
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
    this.objectsService.getObjectList().subscribe((ObjectList) => {
      ObjectList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
  }

  public inventoryObjectsOriginal: ObjectItem[] = [];
  public inventoryObjectsList: ObjectItem[] = [];
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
      object.objectTitle
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
    if (objectSelected) {
      this.objectUnit = objectSelected.unit;

    }

    // console.log(objectSelected?.objectTitle);
    this.addObjectFormGroup.setValue({
      input: objectSelected?.objectTitle,
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
