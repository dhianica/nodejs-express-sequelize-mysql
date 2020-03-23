module.exports = (sequelize, Sequelize) => {
    const OrgStructure = sequelize.define("tbl_org_structure", {
        parent_id: {
            type: Sequelize.INTEGER
        },
        org_structure_name: {
            type: Sequelize.STRING
        },
        org_structure_description: {
            type: Sequelize.STRING
        },
        map_id: {
            type: Sequelize.INTEGER
        },
        map_spatial: {
            type: Sequelize.GEOMETRY
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

    return OrgStructure;
};