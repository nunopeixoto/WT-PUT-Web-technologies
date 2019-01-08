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
      console.log('heqyeqwuweque')     
    } catch (err) {
      console.log(err)
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
      console.log(err)
      res.status(400).send({
        error: 'Error updating personal reading.'
      })
    }
  },
  async findLastFinishedPersonalReading(req, res) {
    try {
      const lastFinishedPersonalReading = await PersonalReading.findAll({where: {UserId: req.params.UserId}, limit: 1, order: [['endDate', 'DESC']]})

      res.send(lastFinishedPersonalReading)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error finding last finished book.'
      })
    }
  }
}
