import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class UserService extends BaseHttpService {
  public getAll(): Observable<User[]> {
    /*To be implemented*/
    return this.http.get<User[]>(`${this.baseUrl}/users`);

    //return of([new User('myId', 'Fake user', 42), new User('myId', 'Fake user 2', 666)]);
  }

  public getById(userId): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }
}
