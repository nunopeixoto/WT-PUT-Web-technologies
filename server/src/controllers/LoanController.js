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
        const loan = Loan.create(req.body)
        
        res.send(loan.toJSON())
      } catch (err) {
        res.status(400).send({
            error: 'Error listing loans'
          })  
      }
  },
  async getLoansByUserId(req, res) {
    try {
      const loansUser = await Loan.findAll({
        where : {
          $or: [
          {
            UserLenterId: 
            {
              $eq: req.params.UserId,
            }
          },
          {
            UserBorrowerId:
            {
              $eq: req.params.UserId
            }
          }
          ]
        }
      })
      res.send(loansUser)
    } catch (err) {
      res.status(400).send({
        error: 'Error finding user\'s loans.'
      })  
    }
  }
}
