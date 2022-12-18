const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);

router.delete(`/:id`, (req, res) => {
    let id = req.params.id;
    let sqlQuery = `
    DELETE FROM "todoList"
    WHERE "id"=$1;
    `
    let sqlValues = [id];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    }).catch((dbErr) => {
        console.log(`Error in /todo server DELETE`, dbErr);
        res.sendStatus(500);
    });
});

router.get(`/`, (req, res) => {
    let sqlQuery = `
        SELECT * FROM "todoList"
            ORDER BY "deadline" ASC;`;
    pool.query(sqlQuery)
    .then((dbRes) => {
        let todoTableData = dbRes.rows;
        res.send(todoTableData);
    }).catch((dbErr) => {
        res.sendStatus(500);
    });
});

router.get(`/:id`, (req, res) => {
    let id = req.params.id;
    let sqlQuery = `
        SELECT * FROM "todoList"
            WHERE "id" = ${id};`;
    pool.query(sqlQuery)
    .then((dbRes) => {
        res.send(dbRes);
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