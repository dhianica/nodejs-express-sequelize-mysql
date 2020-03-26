module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sz123",
  DB: "dashboard_polda",
  dialect: "mysql",
  port: 3308,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};