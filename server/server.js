const express = require(`express`);
const bodyParser = require(`body-parser`);
const pool = require(`./modules/pool.js`);
const app = express();
const PORT = 5000;
const todoRouter = require(`./routes/todo.js`);
const completedRouter = require(`./routes/completed.js`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(`server/public`));
app.use(`/todo`, todoRouter);
app.use(`/completed`, completedRouter);

app.listen(PORT, () => {
    console.log(`listening on port`, PORT)
});