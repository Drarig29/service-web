const _ = require('lodash');

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    getAll(bookId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        return this.db.getData(bookPath + '/copies');
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