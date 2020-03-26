const db = require("../models");
const OrgStructure = db.orgStructures;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'shhhhh';

const utils = require('../utils/utils');
// Create and Save a new User
exports.create = (req, res) => {
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
                    // Validate request
                    if (!req.body.org_structure_name) {
                        res.status(400).send({
                            message: "Content can not be empty!"
                        });
                        return;
                    }
                    // Create a Config
                    const orgStructure = {
                        parent_id: req.body.parent_id,
                        org_structure_name: req.body.org_structure_name,
                        org_structure_description: req.body.org_structure_description,
                        map_id: req.body.map_id,
                        res_1: req.body.res_1,
                        res_2: req.body.res_2,
                        res_3: req.body.res_3,
                        res_4: req.body.res_4,
                        res_5: req.body.res_5
                    };

                    // Save User in the database
                    OrgStructure.create(orgStructure)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Organization Structure."
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

// Retrieve all Users from the database.
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
                    const isTree = req.query.isTree;
                    const object = req.query.object;
                    const org_structure_name = req.query.org_structure_name;
                    const parent_id = req.query.parent_id;
                    const id = req.query.id;
                    let condition = "";
                    const condition1 = org_structure_name ? { org_structure_name: { [Op.like]: `%${org_structure_name}%` } } : null;
                    const condition2 = parent_id ? { parent_id: { [Op.eq]: `${parent_id}` } } : null;
                    const condition3 = id ? { id: { [Op.eq]: `${id}` } } : null;

                    if (condition1 != null && condition2 == null && condition3 == null) {
                        condition = condition1;
                    }
                    else if (condition1 == null && condition2 != null && condition3 == null) {
                        condition = condition2;
                    }
                    else if (condition1 == null && condition2 == null && condition3 != null) {
                        condition = condition3;
                    }
                    else if (condition1 != null && condition2 != null && condition3 == null) {
                        condition = {
                            [Op.and]: [condition1, condition2]
                        };
                    }
                    else if (condition1 != null && condition2 == null && condition3 != null) {
                        condition = {
                            [Op.and]: [condition1, condition3]
                        };
                    }
                    else if (condition1 == null && condition2 != null && condition3 != null) {
                        condition = {
                            [Op.and]: [condition2, condition3]
                        };
                    }
                    else if (condition1 != null && condition2 != null && condition3 != null) {
                        condition = {
                            [Op.and]: [condition1, condition2, condition3]
                        };
                    }
                    
                    OrgStructure.findAll({
                            attributes: [
                                'id', 
                                'parent_id', 
                                'org_structure_name', 
                                'org_structure_description', 
                                'map_id',
                                'res_1',
                                'res_2',
                                'res_3',
                                'res_4',
                                'res_5',
                                'createdAt',
                                'updatedAt'
                            ],
                            where: condition,
                            order: [['parent_id', 'ASC'], ['id', 'ASC']]
                        })
                        .then(data => {
                            if (isTree === '1') {
                                // if (object === 'table') {
                                //     const datas = utils.createTreeTableJsonObject(JSON.parse(JSON.stringify(data)))
                                //     res.send(datas)
                                // } else {
                                const datas = utils.createTreeJsonObject(JSON.parse(JSON.stringify(data)))
                                res.send(datas)
                                // }
                            } else {
                                res.send(data)
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving Organization Structure."
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

// Find a single User with an id
exports.findOne = (req, res) => {
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
                    const id = req.params.id;

                    OrgStructure.findByPk(id)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retrieving Organization Structure with id=" + id
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

// Update a User by the id in the request
exports.update = (req, res) => {
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
                    const id = req.params.id;

                    OrgStructure.update(req.body, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Organization Structure was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update Organization Structure with id=${id}. Maybe Organization Structure was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Organization Structure with id=" + id
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

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
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
                    const id = req.params.id;

                    OrgStructure.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Organization Structure was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete Organization Structure with id=${id}. Maybe Organization Structure was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Organization Structure with id=" + id
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

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
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
                    OrgStructure.destroy({
                        where: {},
                        truncate: false
                    })
                        .then(nums => {
                            res.send({ message: `${nums} Organization Structure were deleted successfully!` });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while removing all Organization Structure."
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