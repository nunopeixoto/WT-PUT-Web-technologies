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
  async newPersonalReading(req, res) {
    try {
      const newPersonalReading = await PersonalReading.create(req.body)
      const newPersonalReadingJson = newPersonalReading.toJSON()
      res.send(newPersonalReadingJson)
    } catch (err) {
      res.status(400).send({
        error: 'Error creating book.'
      })
    }
  }
}
