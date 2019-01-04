const {Loan} = require('../models')


module.exports = {
  async getAll(req, res) {
    try {
      const loans = await Loan.findAll()
      res.send(loans)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing loans'
      })
    }
  },
  async createLoan(req, res) {
      try {
          console.log('dqwuq231321111111111111111111111dwqduqudqwq'+JSON.stringify(req.body))
        const loan = Loan.create(req.body)
        
        res.send(loan.toJSON())
      } catch (err) {
        res.status(400).send({
            error: 'Error listing loans'
          })  
      }
  }
}
