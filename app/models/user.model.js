module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tbl_user", {
        user_number: {
            type: Sequelize.STRING
        },
        user_fullname: {
            type: Sequelize.STRING
        },
        user_nickname: {
            type: Sequelize.STRING
        },
        user_type: {
            type: Sequelize.INTEGER
        },
        org_structure_id: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        password_salt: {
            type: Sequelize.STRING
        }
    });

    return User;
};