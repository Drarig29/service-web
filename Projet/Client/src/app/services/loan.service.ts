import { Observable,} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {Loan} from '../model/loan';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class LoanService extends BaseHttpService {
  loan(copyId, userId): Observable<Loan> {
    /* to be changed */
    const loanObj : Loan = {
      "userId": userId,
      "copyId": copyId,
      "loanDate": new Date().toISOString().split('T')[0].replace(/-/,'/')
    }

    return this.http.post<Loan>(`${this.baseUrl}/loans`,loanObj)
    //je crois que cette partie sert si on utilise le retour du post ? 
    .pipe(map(()=> null), catchError((err) => { console.log(err); return null; }));

    /*return of({})
      .pipe(
        map(() => null),
        catchError((err) => { console.log(err); return null; })
      );*/
  }

  public getAll(): Observable<Loan[]> {
    return this.http
      .get<Loan[]>(`${this.baseUrl}/loans`);
  }

  // TODO : Faire la route API du delete des emprunts 

  public return(copyId):Observable<Loan> {
    return this.http.delete<Loan>(`${this.baseUrl}/loans/${copyId}`); 
  }
}
