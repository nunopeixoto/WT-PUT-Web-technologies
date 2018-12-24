const {Library} = require('../models')
const {User} = require('../models')
const {LibraryInvitations} = require('../models')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 465,
  auth: {
    user: 'peixotobusiness@gmail.com',
    pass: 'webtech123'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = {
  async getAll(req, res) {
    try {
      const librarys = await Library.findAll()
      res.send(librarys)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing librarys'
      })
    }
  },
  async create(req, res) {
    try {
     const library = await Library.create(req.body)
     res.send(library)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create a library'
      })
    }
  },
  async invite(req, res) {
    try {
    const {usernameInviter, emailInvited, libraryId} = req.body
    // const user = await User.findOne({
    //    where: {
    //      email: emailInvited
    //    }
    //  })

    //var urlReq = emailInvited.split('@')
    //const userJson = user.toJSON()
    var email = encodeURIComponent(emailInvited)
    //async email
    const url = `http://localhost:8081/library/invite/${email}/${libraryId}`

    let HelperOptions = {
      from: '"myLibrary" peixotobusiness@gmail.com',
      to: emailInvited,
      subject: 'Library Invitation',
      html: `Hello. @${usernameInviter} has invited you to be a part of his library. If you wish to join please click follow this URL: <a href="${url}">${url}</a>`,
    }
        

        transporter.sendMail(HelperOptions, (error, info) => {
          if (error){
            return console.log(error)
          }
          console.log('message sent')
          console.log(info)
        })


     res.send({
       message: 'Invitation sent.'
     })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to invite user.'
      })
    }
  },
  async userAcepted(req, res) {
    try {
      console.log(req.params.email)
      //verify if user is already in db
      var email = decodeURIComponent(req.params.email)
      const userExists = await User.findOne({
        where : {
          email : email
        }
      })
     //if user is registered, then check if he already is part of a library. if not, join one.
     if(userExists){
        const userJson = userExists.toJSON()
        //verify on libraryInvitations table 
        const userAlreadyHasLibrary = await LibraryInvitations.findOne({
          where : {
            UserId : userJson.id
          }
        })
        if (userAlreadyHasLibrary){
          return res.redirect('http://localhost:8080/#/login')
        } else {
            //verify on library table if user is owner of some library
            
            const userIsOwnerOfLibrary = await Library.findOne({
              where : {
                UserId : userJson.id
              }
            })
            if(userIsOwnerOfLibrary){
              return res.redirect('http://localhost:8080/#/login')
            } else{
              await LibraryInvitations.create({
                UserId : userJson.id,
                LibraryId : req.params.libraryId
              })
              return res.redirect('http://localhost:8080/#/login')
            }
        }
      } else {
        return res.redirect(`http://localhost:8080/#/registerenhanced/${req.params.email}/${req.params.libraryId}`)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a library'
      })
    }
  }
}
