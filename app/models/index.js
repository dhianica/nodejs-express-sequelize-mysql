const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.userTokens = require("./user_token.model.js")(sequelize, Sequelize);
db.configs = require("./config.model.js")(sequelize, Sequelize);
db.configDetails = require("./config_detail.model.js")(sequelize, Sequelize);
db.orgStructures = require("./org_structure.model.js")(sequelize, Sequelize);
db.pois = require("./poi.model.js")(sequelize, Sequelize);

module.exports = db;