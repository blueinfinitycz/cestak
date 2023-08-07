import dbConfig from './db.config';
import {CarsTbl,ChildTbl,CompanyTbl,EmployeTbl,LogBooksTbl,ParentTbl,CredentialsTbl,PositionsTbl} from '../models'
const {DataTypes,Sequelize,hasOne, belongsTo} = require('sequelize');
const SQLZ =  new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{host: dbConfig.HOST,dialect: dbConfig.DIALECT})

  export const Employe = SQLZ.define('employees',EmployeTbl,{freezeTableName: true})
  export const Cars = SQLZ.define('cars',CarsTbl,{freezeTableName: true})
  export const Company = SQLZ.define('company',CompanyTbl,{freezeTableName: true})
  export const LogBook = SQLZ.define('logbooks',LogBooksTbl,{freezeTableName: true})
  export const Parent = SQLZ.define('parent',ParentTbl,{freezeTableName: true})
  export const Child = SQLZ.define('child',ChildTbl,{freezeTableName: true})
  export const Credentials =  SQLZ.define('credentials',CredentialsTbl,{frameElement:true})
  export const Positions =  SQLZ.define('positions',PositionsTbl,{frameElement:true})


   Parent.hasOne(Child)
  //  Child.belongsTo(Parent)

  SQLZ.sync({alter: true})
  // .then(() => {
  //   return Parent.findOne({where: {name: 'mama'}});
  // })
  // .then((data:any) => {
  //   parent=data;
  //   return parent.getChild();
  // })
  // .then((data:any) => {
  //   console.log('PARENT CHILD: ', data)
  // })

export default SQLZ;