const {User} = require('../models')
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
              return console.log('PILAAAAAAAAAA'+error)
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
  async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body
      const user = await User.findOne({
        where: {
          email: email
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
          error: 'The login information was incorrect'
        })
      }

      const isEmailConfirmed = user.confirmed
      if (!isEmailConfirmed) {
        return res.status(403).send({
          error: 'You need to verify email'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
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
