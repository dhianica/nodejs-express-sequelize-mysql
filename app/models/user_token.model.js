module.exports = (sequelize, Sequelize) => {
    const UserToken = sequelize.define("tbl_user_token", {
        username: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        expired_date: {
            type: Sequelize.DATE
        },
        expired_timestamp: {
            type: Sequelize.BIGINT
        }
    });

    return UserToken;
};