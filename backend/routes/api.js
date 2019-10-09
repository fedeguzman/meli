const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

/* GET home page. */
router.get("/items", apiController.getItems);
router.get("/items/:id", apiController.getDetailItem);

module.exports = router;
