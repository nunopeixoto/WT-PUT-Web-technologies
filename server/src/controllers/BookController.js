const {Book} = require('../models')
var booksSearch = require('google-books-search')
const _ = require('underscore')
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
        type: 'books'
      }
      booksSearch.search(req.params.query, options, function(error, results) {
        if (!error ) {
         // var arr = [];
          results = _.map(results, function(object) {
            return _.pick(object, ['title', 'subtitle', 'authors', 'publishedDate', 'pageCount', 'publisher', 'language', 'thumbnail'])
          })
           res.send(results)
        } else {
          res.status(400).send({
            error: 'Error finding book.'
          })
        }
    })
    
    } catch (err) {
      res.status(400).send({
        error: 'Error searching book.'
      })
    }
  }
}
