const DataTypes = require('sequelize');

export const ChildTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,allowNull: false},
  }