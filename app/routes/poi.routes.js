module.exports = app => {
    const pois = require("../controllers/poi.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", pois.create);

    // Retrieve User
    router.get("/", pois.findAll);

    // Retrieve a single User with id
    router.get("/:id", pois.findOne);


    // Update a User with id
    router.put("/:id", pois.update);

    // Delete a User with id
    router.delete("/:id", pois.delete);


    app.use('/api/pois', router);
};