const {Book} = require('../models')

module.exports = {
  async getAllBooks(req, res) {
    try {
      const Books = await Book.findAll()
      res.send(Books)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing books'
      })
    }
  },
  async newBook(req, res) {
    try {
      const newBook = await Book.create(req.body)
      const newBookJson = newBook.toJSON()
      res.send(newBookJson)
    } catch (err) {
        console.log(err)
      res.status(400).send({
        error: 'Error creating book.'
      })
    }
  }
}
