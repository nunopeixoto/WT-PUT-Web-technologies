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
          const PersonalReadings = await PersonalReading.findAll({
            where : {
              UserId: req.params.UserId,
              LibraryId: req.params.LibraryId
            }
          })
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
  }
}
