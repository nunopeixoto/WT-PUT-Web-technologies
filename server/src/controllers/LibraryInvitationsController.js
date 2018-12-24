// const {Library} = require('../models')
// const {User} = require('../models')
 const {LibraryInvitations} = require('../models')
// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   secure: false,
//   port: 465,
//   auth: {
//     user: 'peixotobusiness@gmail.com',
//     pass: 'webtech123'
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// })

module.exports = {
  async getAllLibraryInvitations(req, res) {
    try {
      const libraryInvitations = await LibraryInvitations.findAll()
      res.send(libraryInvitations)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing library invitations'
      })
    }
  }
}
