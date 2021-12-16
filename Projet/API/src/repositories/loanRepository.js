const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkLoan = function (loan) {
    if (!loan.loanDate) {
        throw new ValidationError('The loan must have a loanDate.');
    }
}

class LoanRepository {
    constructor(db, userRepository, copyRepository) {
        this.db = db;
        this.userRepository = userRepository;
        this.copyRepository = copyRepository;
    }

    getAll() {
        return this.db.getData("/loans");
    }

    add(loan) {
        const userPath = this.userRepository.getIdPath(loan.userId);
        if (userPath == null) {
            throw new ValidationError('This user does not exists')
        }

        const copyExists = this.copyRepository.exists(loan.copyId);
        if (!copyExists) {
            throw new ValidationError('This copy does not exists')
        }

        const loans = this.getAll();
        if (_.some(loans, { copyId: loan.copyId })) { 
            throw new ValidationError('This copy is already loaned')
        }

        checkLoan(loan);
        loan.id = uuid();
        this.db.push("/loans[]", loan);
        return loan;
    }

    // get(id) {
    //     const books = this.getAll();
    //     return _.find(books, { id });
    // }

    // update(id, book) {
    //     if (book.id !== id) {
    //         throw new ValidationError('You cannot change the identifier.');
    //     }

    //     checkBook(book); 
    //     const path = this.getIdPath(id);
    //     if (path == null) {
    //         throw new ValidationError('This book does not exists');
    //     }

    //     this.db.push(path, book);

    //     return book;
    // }

    // delete(id) {
    //     const path = this.getIdPath(id);
    //     if (path != null) {
    //         this.db.delete(path);
    //     }

    // }

    // getIdPath(id) {
    //     const books = this.getAll();
    //     const index = _.findIndex(books, { id });
    //     if (index == -1) {
    //         return null;
    //     }

    //     return '/books[' + index + ']';
    // }
}

module.exports = LoanRepository;