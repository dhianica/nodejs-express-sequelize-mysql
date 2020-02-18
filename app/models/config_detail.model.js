module.exports = (sequelize, Sequelize) => {
    const ConfigDetail = sequelize.define("tbl_config_detail", {
        config_id: {
            type: Sequelize.STRING
        },
        config_detail_name: {
            type: Sequelize.STRING
        }
    });

    return ConfigDetail;
};