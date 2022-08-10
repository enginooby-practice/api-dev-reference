const express = require("express");
const fs = require("fs");
const router = express.Router();

const path = require("path");
const dataFilePath = path.join(__dirname, "./_Shared/todolist.json");

const getAll = async (req, res, next) => {
  try {
    const dataJson = fs.readFileSync(dataFilePath);
    const data = JSON.parse(dataJson);
    res.json(data);
    // const countryStat = data.find(stat => stat.country.toUpperCase() == req.params.country.toUpperCase());
    //
    // if (!countryStat) {
    //   const error = new Error(`Data for ${req.params.country} not found`);
    //   error.status = 404;
    //   throw error;
    // }
    // res.json(countryStat);
  } catch (e) {
    next(e);
  }
};

router
  .route("/api")
    .get(getAll);

module.exports = router;
