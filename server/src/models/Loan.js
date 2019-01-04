module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
      status: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      }
    },
    {
      timestamps: true
    })
    
    Loan.associate = function (models) {
        Loan.belongsTo(models.PersonalReading)
        Loan.belongsTo(models.User, {as: 'UserLenter'})
        Loan.belongsTo(models.User, {as: 'UserBorrower'})
        // Loan.belongsTo(models.ExternalUser, {as: 'ExternalUserLenter'})
        // Loan.belongsTo(models.ExternalUser, {as: 'ExternalUserBorrower'})
        Loan.belongsTo(models.Book, {as: 'ExternalBook'})
    }
  
    return Loan
  }