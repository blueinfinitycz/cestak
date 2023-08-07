const DataTypes = require('sequelize');

export const CredentialsTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    login: {type: DataTypes.STRING,allowNull: false},
    password: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }