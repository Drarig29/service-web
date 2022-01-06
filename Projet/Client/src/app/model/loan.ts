import { Book } from "./book";
import { User } from "./user";

export class Loan {
    public book?: Book
    public user?: User

    constructor(
        public userId: string, 
        public copyId: string, 
        public loanDate: string
        ) {}
}
