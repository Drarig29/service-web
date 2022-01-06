import { Observable, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Loan } from '../model/loan';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class LoanService extends BaseHttpService {
  loan(copyId: string, userId: string): Observable<Loan> {
    /* to be changed */
    const loanObj: Loan = {
      "userId": userId,
      "copyId": copyId,
      "loanDate": new Date().toISOString().split('T')[0].replace(/-/g, '/')
    }

    return this.http.post<Loan>(`${this.baseUrl}/loans`, loanObj)
      .pipe(map(() => null), catchError((err) => { console.log(err); return null; }));
  }

  public getAll(): Observable<Loan[]> {
    return this.http
      .get<Loan[]>(`${this.baseUrl}/loans`);
  }

  public return(copyId: string): Observable<Loan> {
    return this.http.delete<Loan>(`${this.baseUrl}/loans/${copyId}`);
  }
}
