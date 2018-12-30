const {Book} = require('../models')
var booksSearch = require('google-books-search')
module.exports = {
  async getBooks(req, res) {
    try {
      let books = null
      const search = req.query.search
      if (req.query.search) {
        books = await Book.findAll({
          where : {
            $or : [
              'title', 'authors'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        books = await Book.findAll()
      }
      res.send(books)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing books'
      })
    }
  },
  async getBookById (req, res) {
    try {
      const book = await Book.findOne({
        where : {
          id: req.params.id
        }
      })
      res.send(book)
    } catch (err) {
      res.status(400).send({
        error: 'Error finding book'
      })
    }
  },
  async newBook(req, res) {
    try {
      const bookExists = await Book.findOne({
        where: {
          title: req.body.title,
          authors: req.body.authors,
          nrPages: req.body.nrPages
        }
      })
      if(bookExists){
        res.send({
          message: 'Book already exists.'
        })
      } else {
      const newBook = await Book.create(req.body)
      const newBookJson = newBook.toJSON()
      res.send(newBookJson)
      }
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
      booksSearch.search(req.params.query, options, function(error, results) {
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
