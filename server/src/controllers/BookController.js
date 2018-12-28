const {Book} = require('../models')
var booksSearch = require('google-books-search')
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
  },
  async search(req, res) {
    try {
  
      var options = {
        limit: 5,
        type: 'books'
      }
      booksSearch.search('Harry Potter', options, function(error, results) {
        if ( ! error ) {
            console.log(results)
            res.send(results)
        } else {
            console.log(error)
        }
    })
    
    } catch (err) {
      res.status(400).send({
        error: 'Error searching book.'
      })
    }
  }
}
