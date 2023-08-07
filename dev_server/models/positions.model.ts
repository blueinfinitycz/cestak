const DataTypes = require('sequelize');

export const PositionsTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    position: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }