module.exports = app => {
    const org_structures = require("../controllers/map.controller.js");

    var router = require("express").Router();
    // Retrieve User
    router.get("/", org_structures.findAll);
    
    app.use('/api/map', router);
};