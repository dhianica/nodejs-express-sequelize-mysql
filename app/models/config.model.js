module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("tbl_config", {
        config_name: {
            type: Sequelize.STRING
        },
        config_type: {
            type: Sequelize.STRING
        },
        config_description: {
            type: Sequelize.STRING
        },
        res_1: {
            type: Sequelize.STRING
        },
        res_2: {
            type: Sequelize.STRING
        },
        res_3: {
            type: Sequelize.STRING
        },
        res_4: {
            type: Sequelize.STRING
        },
        res_5: {
            type: Sequelize.STRING
        }
    });

    return Config;
};