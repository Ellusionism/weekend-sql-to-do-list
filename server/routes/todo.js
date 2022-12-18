const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);

router.get(`/`, (req, res) => {
    console.log(`In /todo GET`);
    let sqlQuery = `
        SELECT * FROM "todoList"
            ORDER BY "deadline" DESC;`;
    pool.query(sqlQuery)
    .then((dbRes) => {
        let todoTableData = dbRes.rows;
        res.send(todoTableData);
    }).catch((dbErr) => {
        res.sendStatus(500);
    });
});

module.exports = router;