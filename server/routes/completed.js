const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);

router.get(`/`, (req, res) => {
    console.log(`In /completed GET`);
    let sqlQuery = `
        SELECT * FROM "completedList"
            ORDER BY "dateCompleted" ASC;`;
    pool.query(sqlQuery)
    .then((dbRes) => {
        let completedTableData = dbRes.rows;
        res.send(completedTableData);
    }).catch((dbErr) => {
        res.sendStatus(500);
    });
});

module.exports = router;