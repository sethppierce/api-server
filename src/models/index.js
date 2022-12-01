'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const petsSchema = require('./pets.schema');
const gamesSchema = require('./games.schema');
const ModelInterface = require('./modelInterface');

// 'postgres://localhost:5432/api-app'
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory:'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/api-app';

// sequelize connection with database
const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const PetModel = petsSchema(sequelizeDatabase, DataTypes);
const GamesModel = gamesSchema(sequelizeDatabase, DataTypes);

// interfacing demo
// PetModel.hasMany(GamesModel);
// GamesModel.belongsTo(PetModel);

module.exports = {
  sequelizeDatabase,
  petInterface: new ModelInterface(PetModel),
  gameInterface: new ModelInterface(GamesModel),
};
