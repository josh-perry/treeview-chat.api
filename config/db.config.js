module.exports = {
  HOST: "localhost",
  USER: "treeviewweb",
  PASSWORD: "password123",
  DB: "treeviewchat",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
