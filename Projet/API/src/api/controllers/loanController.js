class LoanController {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        const copies = this.loanRepository.getAll();
        res.json(copies);
    }

    create(req, res) {
        const loan = this.loanRepository.add(req.params.bookId, req.body);
        res.location('/copies/' + loan.id);
        res.status(201).send(loan);
    }
    
    get(req, res) {
        const loan = this.loanRepository.get(req.params.bookId, req.params.loanId);
        if (loan == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(loan);
        }
    }
    
    // update(req, res) {
    //     const loan = this.loanRepository.update(req.params.loanId, req.body)
    //     res.status(200).send(loan);
    // }
    
    // delete(req, res) {
    //     this.loanRepository.delete(req.params.loanId);
    //     res.status(204).send(null);
    // }
}

module.exports = LoanController;