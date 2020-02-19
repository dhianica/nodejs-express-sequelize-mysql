const db = require("../models");
const Poi = db.pois;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

const accessTokenSecret = 'shhhhh';
// Create and Save a new Poi
exports.create = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then poi input is in database already.
                    // Validate request
                    if (!req.body.poi_name) {
                        res.status(400).send({
                            message: "Content can not be empty!"
                        });
                        return;
                    }
                    // Create a Poi
                    const poi = {
                        poi_name: req.body.poi_name,
                        poi_address: req.body.poi_address,
                        poi_lon: req.body.poi_lon,
                        poi_lat: req.body.poi_lat,
                        poi_type: req.body.poi_type,
                        poi_description: req.body.poi_description
                    };

                    // Save Poi in the database
                    Poi.create(poi)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Poi."
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

// Retrieve all Pois from the database.
exports.findAll = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then poi input is in database already.
                    const poi_name = req.query.poi_name;
                    var condition = poi_name ? { poi_name: { [Op.like]: `%${poi_name}%` } } : null;

                    Poi.findAll({ where: condition })
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving Poi."
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

// Find a single Poi with an id
exports.findOne = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then poi input is in database already.
                    const id = req.params.id;

                    Poi.findByPk(id)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retrieving Poi with id=" + id
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

// Update a Poi by the id in the request
exports.update = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then poi input is in database already.
                    const id = req.params.id;

                    Poi.update(req.body, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Poi was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update Poi with id=${id}. Maybe Poi was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Poi with id=" + id
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

// Delete a Poi with the specified id in the request
exports.delete = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            utils.checkValidToken(token, (err, valid) => {
                if (err) {
                    res.send(err);
                }

                if (valid != null) { //If not null then poi input is in database already.
                    const id = req.params.id;

                    Poi.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Poi was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete Poi with id=${id}. Maybe Poi was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Poi with id=" + id
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

// Delete all Pois from the database.
exports.deleteAll = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, pois) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }
            if (utils.checkValidToken(token)) {
                Poi.destroy({
                    where: {},
                    truncate: false
                })
                    .then(nums => {
                        res.send({ message: `${nums} Poi were deleted successfully!` });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while removing all Poi."
                        });
                    });

            }
            else {
                res.status(401).send({
                    message: "Token has expired"
                });
            }
        });
    }
    else {
        res.status(400).send({
            message: "You mush include authorization in header"
        });
    }
};

