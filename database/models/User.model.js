const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize')


const User = sequelize.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
 
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  email: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  sddress: {
    type: DataTypes.STRING
  },
  userType: {
    type: DataTypes.STRING
  },
    
 

});

module.exports = User