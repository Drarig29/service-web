const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkUser = function(user) {
    if (!user.name) {
        throw new ValidationError('The user must have a name.');
    }

    if (!user.age) {
        throw new ValidationError('The user must have an age.');
    }
}

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.getData("/users");
    }

    getById(userId) {
        const userPath = this.getIdPath(userId);
        if (userPath == null) {
            throw new ValidationError('This user does not exists')
        }

        return this.db.getData(userPath);
    }

    add(user) {
        checkUser(user); 
        user.id = uuid();
        this.db.push("/users[]", user);
        return user;
    }

    getIdPath(id) {
        const users = this.getAll();
        const index = _.findIndex(users, { id });
        if (index == -1) {
            return null;
        }

        return '/users[' + index + ']';
    }
}

module.exports = UserRepository;