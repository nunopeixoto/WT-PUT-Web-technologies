const {User} = require('../models')
const {Library} = require('../models')
const {LibraryInvitations} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const nodemailer = require('nodemailer')
const jwt_decode = require('jwt-decode')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
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
  async getAllUsers(req, res) {
    try {
      const allUsers = await User.findAll()
      res.send(allUsers)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing librarys'
      })
    }
  },
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)
      //console.log('TOKENNNNNNNNNNNNNNNNNN:'+ token)
      res.send({
        user: userJson,
        token: token
      })
      //async email
      const url = `http://localhost:8081/confirmation/${token}`

      let HelperOptions = {
        from: '"CompanyName" peixotobusiness@gmail.com',
        to: req.body.email,
        subject: 'Account validation',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      }
          

          transporter.sendMail(HelperOptions, (error, info) => {
            if (error){
              return console.log(error)
            }
            console.log('message send')
            console.log(info)
          })
          //console.log('email token: '+token) 
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async enhancedregister(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)
      res.send({
        user: userJson,
        token: token
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login(req, res) {
    try {
      const {
        username,
        password
      } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isEmailConfirmed = user.confirmed
      if (!isEmailConfirmed) {
        return res.status(403).send({
          error: 'You need to verify email.'
        })
      }
      
      //boolean to check if user trying to log in already has created one library
      var library = await Library.findOne({
        where: {
          UserId: user.id
        }
      })
      var userHasLibrary = false
      if (library){
        userHasLibrary = true
      }else{
       //boolean to check if user trying to log in is already a member of one library
       const libraryInvitation = await LibraryInvitations.findOne({
        where: {
          UserId: user.id
        }
      })
      if(libraryInvitation){
        library = await Library.findOne({
          where : {
            id: libraryInvitation.LibraryId
          }
        })
      }
      var userIsPartOfLibrary = false
      if (library){
        userIsPartOfLibrary = true
      }
    }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
        library: library,
        userHasLibrary: userHasLibrary,
        userIsPartOfLibrary : userIsPartOfLibrary
      })
    } catch (err) {
      console.log('AQUIQWUQIQWUEQWIEQWUQWEUEQU'+err)
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async validate(req, res) {
    try {
      var token = req.params.token
      var id = jwt_decode(token).id
    await User.update({ confirmed: true }, { where: { id } })
    return res.redirect('http://localhost:8080/#/login')
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to validate your account.'
      })
    }
  }

  
}
