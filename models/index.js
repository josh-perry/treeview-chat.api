const dbConfig = require("../config/db.config.js");
let connectionString;

if (process.env.NODE_ENV === "production") {
  connectionString = process.env.DATABASE_URL
}
else {
  connectionString = require("../config/db.config.dev.js");
}

const Sequelize = require("sequelize");
const sequelize = new Sequelize(connectionString, {
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.messages = require("./message.js")(sequelize, Sequelize);

module.exports = db;
