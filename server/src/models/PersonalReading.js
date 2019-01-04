module.exports = (sequelize, DataTypes) => {
    const PersonalReading = sequelize.define('PersonalReading', {
      reading: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
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