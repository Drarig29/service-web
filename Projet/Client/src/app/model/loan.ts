import { Book } from "./book";

export class Loan {
    public book: Book

    constructor(
        public userId: string, 
        public copyId: string, 
        public loanDate: string
        ) {}
}
