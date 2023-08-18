import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../interfaces/sector.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  constructor(private http: HttpClient) {}

  createSector(
    
    sectorDetails: Partial<{
      title: string;
      locationX: string;
      locationY: string;
      locationZ: string;
    }>
  ) {
    console.log("dawdoawd");

    return this.http.post<Sector>(
      'http://localhost:3000/sectors',
      sectorDetails
    );
  }

  getOneSector(id: string) : Observable<Sector> {
    return this.http.get<Sector>('http://localhost:3000/sectors/'+ id);
  }
  getSectorList(): Observable<Sector[]> {
    return this.http.get<Sector[]>('http://localhost:3000/sectors');
  }

  deleteSector(sectorId: string): Observable<Sector> {
    return this.http.delete<Sector>(
      'http://localhost:3000/sectors/' + sectorId
    );
  }

}
