const DataTypes = require('sequelize');

export const MethodsOfPaymentTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    method: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }