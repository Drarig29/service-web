const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkCopy = function(copy) {
    if (!copy.submissionDate) {
        throw new ValidationError('The copy must have a submissionDate.');
    }
}

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    getAll(bookId) {
        if (bookId === undefined) {
            const books = this.bookRepository.getAll();
            return _.concat(...books.map(book => book.copies));
        }
        
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        return this.db.getData(bookPath + '/copies');
    }

    add(bookId, copy) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        checkCopy(copy); 
        copy.id = uuid();
        this.db.push(bookPath + '/copies[]', copy);
        return copy;
    }

    get(bookId, copyId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        const copyPath = this.getIdPath(bookId, copyId);
        if (copyPath == null) {
            throw new ValidationError('This copy does not exists')
        }

        return this.db.getData(copyPath);
    }

    exists(copyId) {
        const copies = this.getAll();
        const index = _.findIndex(copies, { id: copyId });
        if (index === -1) {
            return false;
        }

        return true;
    }

    getIdPath(bookId, id) {
        const copies = this.getAll(bookId);
        const index = _.findIndex(copies, { id });
        if (index == -1) {
            return null;
        }

        const bookPath = this.bookRepository.getIdPath(bookId);
        return bookPath + '/copies[' + index + ']';
    }
}

module.exports = CopyRepository;