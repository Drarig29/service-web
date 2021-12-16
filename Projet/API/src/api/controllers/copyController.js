class CopyController {
    constructor(copyRepository) {
        this.copyRepository = copyRepository;
    }

    getAll(req, res) {
        const copys = this.copyRepository.getAll(req.params.bookId);
        res.json(copys);
    }

    // create(req, res) {
    //     const copy = this.copyRepository.add(req.body);
    //     res.location('/copys/' + copy.id);
    //     res.status(201).send(copy);
    // }
    
    // get(req, res) {
    //     const copy = this.copyRepository.get(req.params.copyId);
    //     if (copy == null) {
    //         res.status(404).send(null);
    //     } else {
    //         res.status(200).send(copy);
    //     }
    // }
    
    // update(req, res) {
    //     const copy = this.copyRepository.update(req.params.copyId, req.body)
    //     res.status(200).send(copy);
    // }
    
    // delete(req, res) {
    //     this.copyRepository.delete(req.params.copyId);
    //     res.status(204).send(null);
    // }
}

module.exports = CopyController;