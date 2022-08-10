import Express from "express";
import fs from 'fs'

const router = Express.Router();
const path = require("path");
const dataFilePath = path.join(__dirname, "../_Shared/todolist.json"); // TODO: Get from root folder
const dataJson = fs.readFileSync(dataFilePath, 'utf-8');
let data = []; // for intellisense to display array methods
data = JSON.parse(dataJson);

const getAll = async (req, res, next) => {
    try {
        // search query
        const titleQuery = req.query.title;
        if (titleQuery) {
            const filteredData = data.filter(e => e.title.toUpperCase().includes(titleQuery.toUpperCase()));
            return res.json(filteredData);
        }

        return res.json(data);
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
