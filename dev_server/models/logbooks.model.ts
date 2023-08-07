const DataTypes = require('sequelize');

export const LogBooksTbl = {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    car_id: {type:DataTypes.INTEGER,allowNull: true},
    date: {type: DataTypes.DATE,allowNull: true},
    from: {type: DataTypes.STRING,allowNull: true},
    to: {type: DataTypes.STRING,allowNull: true},
    via: {type: DataTypes.STRING,allowNull: true},
    departure: {type: DataTypes.STRING,allowNull: true},
    arrival: {type: DataTypes.STRING,allowNull: true},
    speedometer: {type: DataTypes.INTEGER,allowNull: true},
    phm_amount: {type: DataTypes.INTEGER,allowNull: true},
    phm_cost: {type: DataTypes.INTEGER,allowNull: true},
    diet: {type: DataTypes.INTEGER,allowNull: true},
    overnight: {type: DataTypes.INTEGER,allowNull: true},
    method_of_payment_id: {type: DataTypes.INTEGER,allowNull: true}
  }