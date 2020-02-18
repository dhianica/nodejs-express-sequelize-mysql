const db = require("../models");
const Config = db.configs;
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
                    if (!req.body.config_name) {
                        res.status(400).send({
                            message: "Content can not be empty!"
                        });
                        return;
                    }
                    // Create a Config
                    const config = {
                        config_name: req.body.config_name,
                        config_type: req.body.config_type,
                        config_description: req.body.config_description,
                        res_1: req.body.res_1,
                        res_2: req.body.res_2,
                        res_3: req.body.res_3,
                        res_4: req.body.res_4,
                        res_5: req.body.res_5
                    };

                    // Save User in the database
                    Config.create(config)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Config."
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
                    const config_name = req.query.config_name;
                    var condition = config_name ? { config_name: { [Op.like]: `%${config_name}%` } } : null;

                    Config.findAll({ where: condition })
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving Config."
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

                    Config.findByPk(id)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retrieving Config with id=" + id
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

                    Config.update(req.body, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Config was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update Config with id=${id}. Maybe Config was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Config with id=" + id
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

                    Config.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Config was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete Config with id=${id}. Maybe Config was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Config with id=" + id
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
                    Config.destroy({
                        where: {},
                        truncate: false
                    })
                        .then(nums => {
                            res.send({ message: `${nums} Config were deleted successfully!` });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while removing all Config."
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