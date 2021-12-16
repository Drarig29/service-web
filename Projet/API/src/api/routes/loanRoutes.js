module.exports = function (app, loanController) {
    app.route('/loans')
        .get(loanController.getAll.bind(loanController))
        .post(loanController.create.bind(loanController));

    app.route('/users/:userId/loans')
        .get(loanController.getLoansByUser.bind(loanController));

    app.route('/books/:bookId/availableCopies')
        .get(loanController.getAvailableCopies.bind(loanController));
}