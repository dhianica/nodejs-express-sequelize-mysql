const db = require("../models");
const User = db.users;
const UserToken = db.userTokens;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

const accessTokenSecret = 'shhhhh';
// Create and Save a new User
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

                if (valid != null) { //If not null then user input is in database already.
                    // Validate request
                    if (!req.body.user_number) {
                        res.status(400).send({
                            message: "Content can not be empty!"
                        });
                        return;
                    }
                    const salt = bcrypt.genSaltSync(10);
                    // Create a User
                    const user = {
                        user_number: req.body.user_number,
                        user_fullname: req.body.user_fullname,
                        user_nickname: req.body.user_nickname,
                        user_type: req.body.user_type,
                        org_structure_id: req.body.org_structure_id,
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, salt),
                        password_salt: salt
                    };

                    // Save User in the database
                    User.create(user)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the User."
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
                    const user_number = req.query.user_number;
                    var condition = user_number ? { user_number: { [Op.like]: `%${user_number}%` } } : null;

                    User.findAll({ where: condition })
                        .then(data => {
                            const datas = {
                                data: data
                            };
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving User."
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

                    User.findByPk(id)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retrieving User with id=" + id
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


// get login
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password
    var condition = { username: { [Op.eq]: `${username}` } };

    User.findAll({ where: condition })
        .then(data => {
            if(data.length == 0)
            {
                res.status(500).send({
                    message: "User not found"
                });
            }
            else
            {
                if (bcrypt.compareSync(password, data[0].password)) {
                    const expiredTimestamp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365);
                    const expiredDate = new Date(expiredTimestamp * 1000);
                    
                    const accessToken = jwt.sign({ username: data.username }, accessTokenSecret, { expiresIn: 60 * 60 * 24 * 365 });
                    const userToken = {
                        username: username,
                        token: accessToken,
                        expired_date: expiredDate,
                        expired_timestamp: expiredTimestamp,
                    };

                    UserToken.create(userToken);
                    
                    res.send({
                        accessToken: userToken
                    });
                }
                else {
                    res.status(500).send({
                        message: "Your password something wrong"
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when login",
                errormessage: err.message
            });
        });
};


// get login
exports.logout = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            }

            const date = Date.now();
            
            const expired_timestamp = Math.floor(date / 1000);
            const expired_date = new Date(expired_timestamp * 1000);
            
            const datas = {
                expired_date: expired_date,
                expired_timestamp: expired_timestamp
            }
            //Update User Token in the database
            UserToken.update(datas, {
                where: { token: token }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "Logout successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot Logout with Token=${token}. Maybe token was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error when logout",
                        errormessage: err.message
                    });
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

                    User.update(req.body, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "User was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating User with id=" + id
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

                    User.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "User was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete User with id=" + id
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
            if (utils.checkValidToken(token)) {
                User.destroy({
                    where: {},
                    truncate: false
                })
                .then(nums => {
                    res.send({ message: `${nums} User were deleted successfully!` });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while removing all User."
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

