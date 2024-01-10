const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// config
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "10.210.42.73",
    port: 3306,
    user: "root",
    password: "home1xfactory",
    database: "To_do",
  },
});
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  knex
    .select()
    .from("todo")
    .then((rows) => {
      const data = JSON.parse(JSON.stringify(rows));
      console.log(data);
      res.send(data);
    });
});

app.get("/todo/:id", (req,res) => {
    knex.select()
    .from("todo")
    .where('id','=',req.params.id)
    .then((rows) => {
        const data = JSON.parse(JSON.stringify(rows));
        console.log(data);
        res.send(data);
      })
})

app.post("/todo_post", (req, res) => {
  knex("todo").insert({ todo: req.body.todo }).then((result) => {
    return res.send({ success: true, message: "ok" });

  })
});

app.put("/update/:id", (req,res) => {
    const todo = req.body.todo;
    knex.
    select()
    .from("todo")
    .where('id','=',req.params.id)
    .update({todo : todo})
    .then(data => res.status(200).json('Success'))
})

app.delete("/delete/:id", (req,res) => {
    knex("todo").del().where('id','=',req.params.id)
    .then(data => res.status(200).json('Delete'))
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
