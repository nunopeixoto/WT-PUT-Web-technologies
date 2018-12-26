// const {User} = require('../models')
// const {Library} = require ('../models')

module.exports = (sequelize) => {
    const LibraryInvitations = sequelize.define('LibraryInvitations', {
    })

    // By default the code below will add UserId and LibraryId to the LibraryInvitations table, and remove any 
    // previously defined primary key attribute - the table will be uniquely identified by the combination
    // of the keys of the two tables, and there is no reason to have other PK columns.   --> sequelzie documentation
    LibraryInvitations.associate = function(models)  {
        models.User.belongsToMany(models.Library, {
            as: 'User',
            foreignKey: 'UserId',
            through: LibraryInvitations
        }),
        models.Library.belongsToMany(models.User, {
            as: 'Library',
            foreignKey: 'LibraryId',
            through: LibraryInvitations
        })
    }
    return LibraryInvitations
  }
