module.exports = (sequelize, DataTypes) => {
    const PersonalReading = sequelize.define('PersonalReading', {
      reading: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
        defaultValue: 'No comments added.'
      },
      startDate: {
        type: DataTypes.DATEONLY,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      }
    },
    {
      timestamps: false
    })
    
    PersonalReading.associate = function (models) {
        PersonalReading.belongsTo(models.User)
        PersonalReading.belongsTo(models.Library)
        PersonalReading.belongsTo(models.Book)
    }
  
    return PersonalReading
  }