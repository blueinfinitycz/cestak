const DataTypes = require('sequelize');

export const ParentTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,allowNull: false},
  }