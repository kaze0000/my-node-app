const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

const router = express.Router();

let todos = [];

router.get("/", function (req, res, next) {
  connection.query(`select * from tasks`, (err, results) => {
    res.render("index", {
      title: "ToDo App",
      todos: results,
    });
  });
});

router.post("/", function (req, res, next) {
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}')`,
    (err, result) => {
      console.log(err);
      res.redirect("/");
    }
  );
});

router.post("/update", function (req, res, next) {
  console.log(req.body);
  const taskId = req.body.id;
  const updatedContent = req.body.updatedContent;
  connection.query(
    `update tasks set content = '${updatedContent}' where id = ${taskId}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});

router.post("/delete", function (req, res, next) {
  const taskId = req.body.id;
  connection.query(`delete from tasks where id = ${taskId}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
