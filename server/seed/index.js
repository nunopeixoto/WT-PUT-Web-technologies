const {
    sequelize,
    User,
    Library
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const librarys = require('./librarys.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
        librarys.map(library => {
        Library.create(library)
      })
    )
  })