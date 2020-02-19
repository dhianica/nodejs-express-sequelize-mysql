module.exports = (sequelize, Sequelize) => {
    const Poi = sequelize.define("tbl_poi", {
        poi_name: {
            type: Sequelize.STRING
        },
        poi_address: {
            type: Sequelize.STRING
        },
        poi_lon: {
            type: Sequelize.FLOAT
        },
        poi_lat: {
            type: Sequelize.FLOAT
        },
        poi_type: {
            type: Sequelize.INTEGER
        },
        poi_description: {
            type: Sequelize.STRING
        }
    });

    return Poi;
};