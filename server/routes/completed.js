const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);

router.delete(`/:id`, (req, res) => {
    let id = req.params.id;
    let sqlQuery = `
    DELETE FROM "completedList"
    WHERE "id"=$1;
    `
    let sqlValues = [id];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    }).catch((dbErr) => {
        console.log(`Error in /completed server DELETE`, dbErr);
        res.sendStatus(500);
    });
});

router.get(`/`, (req, res) => {
    let sqlQuery = `
        SELECT * FROM "completedList"
            ORDER BY "dateCompleted" ASC;`;
    pool.query(sqlQuery)
    .then((dbRes) => {
        let completedTableData = dbRes.rows;
        res.send(completedTableData);
    }).catch((dbErr) => {
        console.log(`Error in /completed server GET`, dbErr)
        res.sendStatus(500);
    });
});

router.post(`/`, (req, res) => {
    let sqlQuery = `
    INSERT INTO "completedList" ("task", "dateCompleted")
    VALUES ($1, $2);
    `
    let sqlValues = [req.body.task, req.body.dateCompleted];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
    res.sendStatus(201);
    })
    .catch((dbErr) => {
    console.log(`Error in /completed server POST`, dbErr);
    res.sendStatus(500);
    });
});

module.exports = router;