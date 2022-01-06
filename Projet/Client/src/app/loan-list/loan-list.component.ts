import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';


import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';
import { User } from '../model/user';
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
    private bookService : BookService,
    private userService : UserService
    ) { }

  ngOnInit() { this.init(); }

  public init() {
    this.loans$ = this.loanService.getAll();

    /* 
    .pipe(
       tap(this.addCopies.bind(this))
     );
     */
  }

  private returnLoan(copyId) {
    this.loanService.return(copyId).subscribe();
  }
}
