import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectItem } from '../interfaces/object.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObjectsService {
  constructor(private http: HttpClient) {}
  createObject(
    objectDetails: Partial<{
      ObjectTitle: string;
      unit: string;
    }>
  ) {
    return this.http.post('http://localhost:4444/objects', objectDetails);
  }
  getObjectList(): Observable<ObjectItem[]> {
    return this.http.get<ObjectItem[]>('http://localhost:4444/objects');
  }
  
  updateObject(objectDetails: Partial<ObjectItem>): Observable<ObjectItem[]> {
    return this.http.patch<ObjectItem[]>(
      'http://localhost:4444/objects/'+ objectDetails._id,
      objectDetails
    );
  }

  deleteObject(objectId: string): Observable<ObjectItem[]> {
    console.log('objectId', objectId);
    
    return this.http.delete<ObjectItem[]>(
      'http://localhost:4444/objects/' + objectId
    );
  }
}
