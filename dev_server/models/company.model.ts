const DataTypes = require('sequelize');

export const CompanyTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }