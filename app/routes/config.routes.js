module.exports = app => {
    const configs = require("../controllers/config.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", configs.create);

    // Retrieve User
    router.get("/", configs.findAll);
    
    // Retrieve a single User with id
    router.get("/:id", configs.findOne);


    // Update a User with id
    router.put("/:id", configs.update);

    // Delete a User with id
    router.delete("/:id", configs.delete);


    app.use('/api/configs', router);
};