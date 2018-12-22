const {Library} = require('../models')

module.exports = {
  async getAll(req, res) {
    try {
      const librarys = await Library.findAll()
      res.send(librarys)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing librarys'
      })
    }
  },
  async create(req, res) {
    try {
     const library = await Library.create(req.body)
     res.send(library)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a library'
      })
    }
  }

  
}
