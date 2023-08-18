import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectItem } from 'src/app/interfaces/object.interface';
import { ObjectsService } from 'src/app/services/objects.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-inventory-objects',
  templateUrl: './inventory-objects.component.html',
  styleUrls: ['./inventory-objects.component.scss'],
})
export class InventoryObjectsComponent {
  constructor(
    private readonly textService: TextService,
    private readonly objectsService: ObjectsService,
    private readonly _router: Router,
  ) {}

  modalShow: boolean = false;
  showForm: boolean = false;
  showObject: boolean = false;
  public inventoryObjectsOriginal: ObjectItem[] = [];
  public inventoryObjectsList: ObjectItem[] = [];
  public selectedObject: ObjectItem = {
    _id: '',
    objectTitle: '',
    unit: '',
    amount: 0,
  }
  // public appliedFilter: string = '';

  ngOnInit() {
    this.objectsService.getObjectList().subscribe((ObjectList) => {
      ObjectList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
    console.log(this.inventoryObjectsList);
  }

  refreshObjectList() {
    this.modalShow = false;
    this.showObject = false;
    this.inventoryObjectsOriginal = [];
    this.inventoryObjectsList = [];
    this.objectsService.getObjectList().subscribe((ObjectList) => {
      ObjectList.forEach((ObjectItem) => {
        this.inventoryObjectsOriginal.push(ObjectItem);
        this.inventoryObjectsList.push(ObjectItem);
      });
    });
    console.log(this.inventoryObjectsList);
  }

  onEditItem(object: ObjectItem) {
    this.selectedObject = object
    this.editInventoryObjectHandler()
  }

  modalGradientCSS: string[] = ['modal-background'];

  closeFormHandler() {
    this.modalShow = false;
    this.showForm = false;
    this.showObject = false;
  }

  addInventoryObjectHandler() {
    this.modalShow = true;
    this.showForm = true;
  }

  editInventoryObjectHandler() {
    this.modalShow = true;
    this.showObject = true;
  }

  toCapitalize(text: string) {
    return this.textService.firstWordInSentenceToUppercase(text);
  }

  pluralChecker(number: number) {
    if (number > 1) {
      return '';
    }
    return 's';
  }
}
