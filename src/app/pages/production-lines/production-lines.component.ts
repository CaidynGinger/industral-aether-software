import { Component } from '@angular/core';
import { ProductionLine } from 'src/app/interfaces/productionLine.interface';
import { ProductionLinesService } from 'src/app/services/production-lines.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-production-lines',
  templateUrl: './production-lines.component.html',
  styleUrls: ['./production-lines.component.scss'],
})
export class ProductionLinesComponent {
  constructor(private readonly textService: TextService,
    private readonly productionLinesService: ProductionLinesService
    ) {}

  public productionLineOriginal: ProductionLine[] = [];
  public productionLineList: ProductionLine[] = [];

  ngOnInit() {
    this.productionLinesService.getProductionLineList().subscribe((ProductionLineList) => {
      ProductionLineList.forEach((ProductionLine) => {
        
        this.productionLineOriginal.push(ProductionLine);
        this.productionLineList.push(ProductionLine);
      });
    });
    
  }

  public modalShow: boolean = false;
  public showAddProductionLine: boolean = false;
  public showProductionLine: boolean = false;
  public selectedProductionLine: ProductionLine = {
    _id: '',
    productionLineTitle: "",
    productionLineInputs: [],
    productionLineOutputs: [],
  }

  closeFormHandler() {
    this.modalShow = false;
    this.showAddProductionLine = false;
    this.showProductionLine = false;
  }

  refreshProductionLineList() {
    this.modalShow = false;
    this.showProductionLine = false;
    this.productionLineOriginal = [];
    this.productionLineList = [];
    this.productionLinesService.getProductionLineList().subscribe((ProductionLineList) => {
      ProductionLineList.forEach((ProductionLine) => {
        this.productionLineOriginal.push(ProductionLine);
        this.productionLineList.push(ProductionLine);
      });
    });
  }

  onEditItem(productionLine: ProductionLine) {
    console.log('productionLine', productionLine);
    
    this.selectedProductionLine = productionLine
    this.editInventoryProductionLineHandler()
  }

  editInventoryProductionLineHandler() {
    this.modalShow = true;
    this.showProductionLine = true;
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

  addProductionLineHandler() {
    this.modalShow = true;
    this.showAddProductionLine = true;
  }
}
