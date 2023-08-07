const DataTypes = require('sequelize');

export const EmployeTbl =  {
    id: {type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    position_id: {type: DataTypes.INTEGER},
    system_role_id: {type: DataTypes.INTEGER},
    credentials_id: {type: DataTypes.INTEGER},
    company_id: {type: DataTypes.INTEGER},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    telefon: {type: DataTypes.INTEGER},
    exist: {type: DataTypes.BOOLEAN},
  }