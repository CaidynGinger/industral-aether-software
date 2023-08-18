import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionLine } from '../interfaces/productionLine.interface';
import { ObjectItem } from '../interfaces/object.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductionLinesService {
  constructor(private http: HttpClient) {}
  createProductionLine(
    productionLineDetails: Partial<{
      _id: string;
      productionLineTitle: string;
      productionLineInputs: ObjectItem[];
      productionLineOutputs: ObjectItem[];
    }>
  ) {
    return this.http.post(
      'http://localhost:3000/production-lines',
      productionLineDetails
    );
  }
  getProductionLineList(): Observable<ProductionLine[]> {
    return this.http.get<ProductionLine[]>('http://localhost:3000/production-lines');
  }

  updateProductionLine(productionLineDetails: Partial<ProductionLine>): Observable<ProductionLine> {
    return this.http.patch<ProductionLine>(
      'http://localhost:3000/production-lines/'+ productionLineDetails._id,
      productionLineDetails
    );
  }

  deleteProductionLine(productionLineId: string): Observable<ProductionLine> {    
    return this.http.delete<ProductionLine>(
      'http://localhost:3000/production-lines/' + productionLineId
    );
  }
}