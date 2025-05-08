const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();

const server = app.listen(3000, function () {
  console.log("node.js is listening to PORT:" + server.address().port);
})
//cors設定
app.disable("x-powered-by");
app.use(cors()).use(express.json());

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "sample",
});

connection.connect(function (err) {
  if (err) {
    console.log(`failed mysql connect: ${err}`);
    throw err;
  }
  console.log("connected mysql");
});





app.get('/', (req, res) => {
  const sql = `
  SELECT 
   id, 
   title,
   description 
  FROM 
  todos`
  connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.post('/', (req, res) => {
  const todo = req.body;
  console.log(todo.title);
  console.log(todo.description);
  const sql = `
  INSERT INTO todos ( title, description)
  VALUES ("${todo.title}","${todo.description}")
  `
  connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).json(results);
  });
});