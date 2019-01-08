//const dateFormat = require('dateformat')
const {PersonalReading} = require('../models')

module.exports = {
  async getAllPersonalReading(req, res) {
    try {
        const PersonalReadings = await PersonalReading.findAll()
        res.send(PersonalReadings)
      } catch (err) {
        res.status(400).send({
          error: 'Error listing books'
        })
      }
    },
  async getPersonalReadingByLibraryUser(req, res) {
      try {
        const user = req.params.UserId
        console.log(user)
        console.log(req.params.LibraryId)
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
      const Sequelize = require('sequelize')
      const config = require('../config/config')
      const sequelize = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        config.db.options
      )
      const today = new Date()
      /* eslint-disable */
      let cenas = today.toISOString().split('T')
      //.replace(/T/, "").replace(/\..+/,'')+''
     // console.log('fejfwqujwqdjdwqwqd'+ cenas[0])
     var now = new Date()
      if (req.params.reading == 2){
        sequelize.query(`UPDATE PersonalReadings SET reading = ${req.params.reading}, startDate = "${req.params.date}" WHERE id=${req.params.personalReadingId};`, { type: sequelize.QueryTypes.UPDATE})
        .then(function(newPersonalReading) {
          res.send(newPersonalReading)
        })
      } else if (req.params.reading == 1){
        sequelize.query(`UPDATE PersonalReadings SET reading = ${req.params.reading}, endDate = "${req.params.date}" WHERE id=${req.params.personalReadingId};`, { type: sequelize.QueryTypes.UPDATE})
        .then(function(newPersonalReading) {
          res.send(newPersonalReading)
        })
      } else {
      sequelize.query(`UPDATE PersonalReadings SET reading = ${req.params.reading} WHERE id=${req.params.personalReadingId};`, { type: sequelize.QueryTypes.UPDATE})
        .then(function(newPersonalReading) {
          res.send(newPersonalReading)
        })
      }
        
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error updating personal reading.'
      })
    }
  }
}
