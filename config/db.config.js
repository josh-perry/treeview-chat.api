module.exports = {
  dialect: "postgres",
  dialectOptions: {
    "ssl": true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
