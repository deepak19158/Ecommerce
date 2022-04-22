const express = require('express');
const app = express();
var mysql = require('mysql');
const path = require('path');
require('dotenv').config();
const ejsMate = require('ejs-mate');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
    port: 3308,
    database: "dbmsproject"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Hurray!! Database Connected!");
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname + "/views")));


app.get("/products", (req, res) => {
    con.query(`select * from product`, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        var rows = JSON.parse(JSON.stringify(result));
        console.log(rows)
        res.render("products", { rows });
    });
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
