module.exports = app => {
    const org_structures = require("../controllers/org_structure.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", org_structures.create);

    // Retrieve User
    router.get("/", org_structures.findAll);
    
    // Retrieve a single User with id
    router.get("/:id", org_structures.findOne);


    // Update a User with id
    router.put("/:id", org_structures.update);

    // Delete a User with id
    router.delete("/:id", org_structures.delete);


    app.use('/api/org_structures', router);
};