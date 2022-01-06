import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  public loans$: Observable<Loan[]>;

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() { this.init(); }

  public init() {
    this.loans$ = this.loanService.getAll()
      .pipe(
        tap(this.addCopy.bind(this))
      );
  }

  private addCopy(loans: Loan[]) {
    for (const loan of loans) {
      this.bookService.getByCopyId(loan.copyId).pipe(tap(book => loan.book = book)).subscribe();
      this.userService.getById(loan.userId).pipe(tap(user => loan.user = user)).subscribe();
    }
  }

  private returnLoan(copyId) {
    this.loanService.return(copyId).subscribe();
  }
}
