/* eslint-disable */
const {PersonalReading} = require('../models')
const {Book} = require('../models')
module.exports = {
  async getAllPersonalReading(req, res) {
    try {
        const PersonalReadings = await PersonalReading.findAll()
        res.send(PersonalReadings)
      } catch (err) {
        res.status(400).send({
          error: 'Error finding personal readings.'
        })
      }
  },
  async getPersonalReadingById(req, res) {
      try {
          const personalreading = await PersonalReading.findOne({
            where : {
              id: req.params.PersonalReadingId
            }
          })
          res.send(personalreading)
        } catch (err) {
          res.status(400).send({
            error: 'Error finding personal reading.'
          })
        }
    }, 
    async getPersonalReadingByLibraryUser(req, res) {
      try {
        const user = req.params.UserId
          let PersonalReadings = null
          //if param libraryId comes as 0 it means we have to send all personal readings of the user
          if (req.params.LibraryId == 0){
           PersonalReadings = await PersonalReading.findAll({
            where : {
              UserId: user
            }
          })
          } else {
            PersonalReadings = await PersonalReading.findAll({
              where : {
                UserId: req.params.UserId,
                LibraryId: req.params.LibraryId
              }
            })
          }
          res.send(PersonalReadings)
        } catch (err) {
          res.status(400).send({
            error: 'Error listing personal readings.'
          })
        }
  },
  async newPersonalReading(req, res) {
    try {
      const personalReadingExists = await PersonalReading.findOne({
        where: {
          LibraryId: req.body.LibraryId,
          UserId: req.body.UserId,
          BookId: req.body.BookId
        }
      })
      if (personalReadingExists){
        return res.status(403).send({
          error: 'You already added this book to this library.'
        })
      
      } else {
        const newPersonalReading = await PersonalReading.create(req.body)
        const newPersonalReadingJson = newPersonalReading.toJSON()
        res.send(newPersonalReadingJson)
      }
    } catch (err) {
      res.status(400).send({
        error: 'Error creating book.'
      })
    }
  },
  async updateReading(req, res) {
    try {
      let newPersonalReading = null
      if (req.params.reading == 2){
        PersonalReading.update({
          reading: req.params.reading,
          startDate: (req.params.date)
        }, {
        where: 
          {id: req.params.personalReadingId}
        })
        res.send(newPersonalReading)
      } else if (req.params.reading == 1){
        PersonalReading.update({
          reading: req.params.reading,
          endDate: (req.params.date)
        }, {
        where: 
          {id: req.params.personalReadingId}
        })
        res.send(newPersonalReading)
      } else {
        PersonalReading.update({
          reading: req.params.reading
        }, {
        where: 
          {id: req.params.personalReadingId}
        })
        res.send(newPersonalReading)
      }    
    } catch (err) {
      res.status(400).send({
        error: 'Error updating personal reading.'
      })
    }
  },
  async updateComment(req, res) {
    try {
      const updatedPersonalReading = PersonalReading.update({
        comment: req.params.comment
      }, {
      where: 
        {id: req.params.personalReadingId}
      })
      res.send(updatedPersonalReading) 
    } catch (err) {
      res.status(400).send({
        error: 'Error updating personal reading.'
      })
    }
  },
  async findLastFinishedPersonalReading(req, res) {
    try {
      const lastFinishedPersonalReading = await PersonalReading.findAll({where:
         {UserId: req.params.UserId,
        reading: 1},
          limit: 1, order: [['endDate', 'DESC']]})

      res.send(lastFinishedPersonalReading)
    } catch (err) {
      res.status(400).send({
        error: 'Error finding last finished book.'
      })
    }
  },
  async findCurrentlyReadingPersonalReading (req, res) {
    try {
      const currentlyReadingPersonalReading = await PersonalReading.findAll({
        where: 
        {UserId: req.params.UserId,
        reading: 2}, 
        limit: 1, order: [['startDate', 'DESC']]})

      res.send(currentlyReadingPersonalReading)
    } catch (err) {
      res.status(400).send({
        error: 'Error finding current book.'
      })
    }
  },
  async findBooksReadFromLibraries (req, res) {
    try {
      const findBooksReadFromLibraries = await PersonalReading.findAndCountAll({
        where: {
          UserId: req.params.UserId,
          reading : 1
        }
        })
      const findAllBooks = await PersonalReading.findAndCountAll({
          where: {
            UserId: req.params.UserId,
          }
          })

      res.send({
        booksRead: findBooksReadFromLibraries.count,
        totalBooks: findAllBooks.count
      })
    } catch (err) {
      res.status(400).send({
        error: 'Error finding current book.'
      })
    }
  },
  async findAverages (req, res) {
    try {
      const Sequelize = require('sequelize')
      const config = require('../config/config')
      const userId = req.params.UserId
      const sequelize = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        config.db.options
      )

      var nrPages = 0
      var nrDays = 0
      var nrMonths = 0
      const books = await Book.findAll({
        where : {
          id: userId
        }
      })
      
     books.forEach(function(obj){
       nrPages += obj.nrPages
     })
     sequelize.query(`SELECT SUM((julianday(endDate) - julianday(startDate))) AS nrDays FROM PersonalReadings where reading = 1 AND UserId = ${userId};`, { type: sequelize.QueryTypes.SELECT})
       .then(function(result) {
         nrDays = result[0].nrDays
         if (nrDays) {
          nrMonths = (nrDays / 30).toFixed(2)
          averagePagesMonth = +((nrPages / nrMonths).toFixed(2))
          res.send({
            nrDays: nrDays,
            nrPages: nrPages,
            averagePagesDay: Math.round(nrPages / nrDays),
            averagePagesMonth: averagePagesMonth
          })
        } else {
          res.send({
            nrDays: 0,
            nrPages: nrPages,
            averagePagesDay: 0,
            averagePagesMonth: 0
          })
        }
       })
    } catch (err) {
      res.status(400).send({
        error: 'Error finding current book.'
      })
    }
  }
}
