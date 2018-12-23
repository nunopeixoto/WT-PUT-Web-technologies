const {
    sequelize,
    User,
    Library,
    LibraryInvitations,
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const librarys = require('./librarys.json')
const libraryinvitations = require('./libraryinvitations.json')

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

    await Promise.all(
      libraryinvitations.map(libraryinvitation => {
        LibraryInvitations.create(libraryinvitation)
    })
  )
  })