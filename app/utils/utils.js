const db = require("../models");
const UserToken = db.userTokens;
const Op = db.Sequelize.Op;
exports.checkValidToken = function (token, done) { //Check the database if User exists.
    const expired_timestamp = Math.floor(Date.now() / 1000);
    var condition1 = { token: { [Op.eq]: `${token}` } };
    var condition2 = { expired_timestamp: { [Op.gt]: `${expired_timestamp}` } };

    UserToken.findAll({ where: { [Op.and]: [condition1, condition2] } })
        .then(data => {
            if (data.length == 0)
                done(null, null);
            else
                done(null, data);
        }).catch(err => {
            done(err);
        });
};

exports.createTreeJsonObject = function (listData) {
    return listData.reduce((map, node) => {
        map.i[node.map_id] = node
        node._children = []
        node.parent_id === 0 ?
            map.result.push(node) :
            map.i[node.parent_id]._children.push(node)
        return map
    }, { i: {}, result: [] }).result
}