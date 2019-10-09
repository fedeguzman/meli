const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

/* GET home page. */
router.get("/items", apiController.getItems);

module.exports = router;
