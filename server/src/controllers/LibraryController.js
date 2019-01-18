/* eslint-disable */
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
  async getUserLibrarys(req, res){
    try{
      const Sequelize = require('sequelize')
      const config = require('../config/config')
      const userId = req.params.userId
      const sequelize = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        config.db.options
      )
      sequelize.query(`SELECT l.name FROM Libraries l LEFT JOIN LibraryInvitations i ON l.id = i.LibraryId WHERE l.UserId=${userId} OR i.UserId=${userId}`, { type: sequelize.QueryTypes.SELECT})
        .then(function(libraryNames) {
          res.send(libraryNames)
        })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying get all user librarys.'
      })
    }
  },
  async getLibraryByName(req, res) {
    try { 
      const library = await Library.findOne({
        where : {
          name : req.params.name
        }
      })
      res.send(library)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying get all user librarys.'
      })
    }
  },  
  async getLibraryById(req, res) {
    try { 
      const library = await Library.findOne({
        where : {
          id : req.params.id
        }
      })
      res.send(library)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying get all user librarys.'
      })
    }
  },  
  async userAcepted(req, res) {
    try {
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
        const userAlreadyInLibrary = await LibraryInvitations.findOne({
          where : {
            UserId : userJson.id
          }
        })
        const userIsOwnerOfLibrary = await Library.findOne({
          where : {
            UserId : userJson.id
          }
        })

        if (userAlreadyInLibrary || userIsOwnerOfLibrary){
          return res.send({
            message: 'Success'
          })
        } else {
          await LibraryInvitations.create({
            UserId : userJson.id,
            LibraryId : req.params.libraryId
          })
          res.setHeader('Access-Control-Allow-Origin', '*');
          return res.send({
            message: 'Success'
          })

            }
        }
       else {
        res.setHeader('Access-Control-Allow-Origin', '*')
        return res.redirect(`http://localhost:8080/register-enhanced/${req.params.email}/${req.params.libraryId}`)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a library'
      })
    }
  }
}
