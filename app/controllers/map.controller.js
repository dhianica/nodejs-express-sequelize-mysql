const db = require("../models");
const OrgStructure = db.orgStructures;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'shhhhh';

const utils = require('../utils/utils');

// Retrieve all Map from the database.
exports.findAll = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }

            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then user input is in database already.
                    const id = req.query.id;
                    const parent_id = req.query.parent_id;
                    const map_id = req.query.map_id;
                    const res_1 = req.query.res_1;
                    const res_2 = req.query.res_2;
                    const res_3 = req.query.res_3;
                    const res_4 = req.query.res_4;
                    const res_5 = req.query.res_5;

                    const condition1 = id ? { id: { [Op.eq]: `${id}` } } : null;
                    const condition2 = parent_id ? { parent_id: { [Op.eq]: `${parent_id}` } } : null;
                    const condition3 = map_id ? { map_id: { [Op.eq]: `${map_id}` } } : null;

                    const condition_res_1 = res_1 ? { res_1: { [Op.eq]: `${res_1}` } } : null;
                    const condition_res_2 = res_2 ? { res_2: { [Op.eq]: `${res_2}` } } : null;
                    const condition_res_3 = res_3 ? { res_3: { [Op.eq]: `${res_3}` } } : null;
                    const condition_res_4 = res_4 ? { res_4: { [Op.eq]: `${res_4}` } } : null;
                    const condition_res_5 = res_5 ? { res_5: { [Op.eq]: `${res_5}` } } : null;

                    let finalCondition = null;

                    finalCondition = {
                        [Op.and]: [
                            condition1,
                            condition2,
                            condition3,
                            condition_res_1,
                            condition_res_2,
                            condition_res_3,
                            condition_res_4,
                            condition_res_5
                        ]
                    };
                    
                    OrgStructure.findAll({
                            // attributes: [
                            //     'id',
                            //     'parent_id',
                            //     'org_structure_name',
                            //     'org_structure_description',
                            //     'map_id',
                            //     ['map_spatial', 'features'],
                            //     'res_1',
                            //     'res_2',
                            //     'res_3',
                            //     'res_4',
                            //     'res_5',
                            //     'createdAt',
                            //     'updatedAt'
                            // ],
                            where: finalCondition,
                            order: [['parent_id', 'ASC'], ['id', 'ASC']]
                        })
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving Map."
                            });
                        });
                } else {
                    res.status(401).send({
                        message: "Token has expired"
                    });
                }
            });
        });
    } 
    else {
        res.status(400).send({
            message: "You mush include authorization in header"
        });
    }
    
};


