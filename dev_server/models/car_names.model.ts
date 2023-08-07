const DataTypes = require('sequelize');

export const CarNamesTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }