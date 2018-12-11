const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const jwt = require('jsonwebtoken')
// const models = ('./models')
// const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)
    
  app.get('/confirmation/:token', 
    AuthenticationController.validate)
    
  // async (req, res) => {
  //     console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhey')
  //     try {
  //       const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET)
  //       console.log(jwt.verify(req.params.token, EMAIL_SECRET))
  //       await models.User.update({ confirmed: true }, { where: { id } })
  //       console.log({ user: {id}})
  //     } catch (e) {
  //       res.send('error')
  //     }
    
  //     return res.redirect('http://localhost:8080/#/login')
  //   })
    
}
