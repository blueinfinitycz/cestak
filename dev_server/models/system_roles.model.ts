const DataTypes = require('sequelize');

export const SystemRolesTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    role: {type: DataTypes.STRING,allowNull: false},
    exist: {type: DataTypes.BOOLEAN,allowNull: false},
  }