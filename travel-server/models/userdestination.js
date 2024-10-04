'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDestination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // UserDestination belongs to User
       UserDestination.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      // UserDestination belongs to Destination
      UserDestination.belongsTo(models.Destination, {
        foreignKey: 'DestinationId',
      });
    }
  }
  UserDestination.init(
    {
      UserId: DataTypes.INTEGER,
      DestinationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserDestination',
    }
  );
  return UserDestination;
};