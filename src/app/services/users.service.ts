import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4444/users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>("http://localhost:4444/users/" + id)
  }
}
