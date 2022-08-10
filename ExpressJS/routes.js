const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "./corona-data.json");

const getData = async (req, res, next) => {
  try {
    const data = fs.readFileSync(dataFilePath);
    const stats = JSON.parse(data);
    const countryStat = stats.find(stat => stat.country.toUpperCase() == req.params.country.toUpperCase());

    if (!countryStat) {
      const error = new Error(`Data for ${req.params.country} not found`);
      error.status = 404;
      throw error;
    }
    res.json(countryStat);
  } catch (e) {
    next(e);
  }
};

router
  .route("/corona/:country")
  .get(getData);

module.exports = router;
