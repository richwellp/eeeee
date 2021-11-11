const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "quick_",
});


app.post("/create", (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const email = req.body.email;


    db.query(
        "INSERT INTO pseudo_data(`first_name`, `last_name`, `gender`, `email`) VALUES (?,?,?,?)",
        [first_name, last_name, gender, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});


app.get("/entities", (req, res) => {
    db.query("SELECT * FROM `pseudo_data` LIMIT 10", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const email = req.body.email;
    const id = req.body.id;
    db.query(
        "UPDATE `pseudo_data` SET `first_name` = ?, `last_name` = ?, `gender` = ?, `email` = ? WHERE `id` = ?",
        [first_name, last_name, gender, email, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
  
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM `pseudo_data` WHERE `id` = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/entities", (req, res) => {
    db.query("SELECT * FROM `pseudo_data` LIMIT 10", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});