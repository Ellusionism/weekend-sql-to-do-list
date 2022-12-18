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

router.post(`/`, (req, res) => {
    let sqlQuery = `
    INSERT INTO "todoList" ("task", "deadline")
    VALUES ($1, $2);
    `
    let sqlValues = [req.body.task, req.body.deadline];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
    res.sendStatus(201);
    })
    .catch((dbErr) => {
    console.log(`Error in /todo server POST`, dbErr);
    res.sendStatus(500);
    });
});

module.exports = router;