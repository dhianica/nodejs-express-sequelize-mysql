module.exports = app => {
    const config_details = require("../controllers/config_detail.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", config_details.create);

    // Retrieve User
    router.get("/", config_details.findAll);
    

    // Retrieve a single User with id
    router.get("/:id", config_details.findOne);


    // Update a User with id
    router.put("/:id", config_details.update);

    // Delete a User with id
    router.delete("/:id", config_details.delete);


    app.use('/api/config_details', router);
};