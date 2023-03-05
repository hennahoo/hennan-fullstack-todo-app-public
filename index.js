const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json()); // otetaan JSON tyyppisen tiedon käsittely käyttöön.

// Tarjotaan, Kayttöliittymä puolta tarjolle, Express:llä.
app.use(express.static("kayttoliittyma"));

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://<TIETOKANTA>:<SALASANA>@fullstack01.g6cvkil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Tietokanta valmiina ottamaan tietoa vastaan");
});

// scheema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

// model
const Todo = mongoose.model("Todo", todoSchema, "todos");

// Routes here... post odottaa saavansa selaimelta tietoa
//                 nyt kun testataan ja kehitetään koodia.    selain voi olla, myös,  postman  tai visual studio coden rest
//                postman on apuväline,  jolla voidaan lähettää tänne  tietoa.
//                                       eli sillä lähetetään  "body"  js
app.post("/todos", async (request, response) => {
  const { text } = request.body;
  const todo = new Todo({
    text: text,
  });
  const savedTodo = await todo.save();
  response.json(savedTodo);
});

// cors - allow connection from different domains and ports
app.use(cors());

// convert json string to json object (from request)
app.use(express.json());

// mongo here...

// todos-route       selaimella GET https://47jhnl-3000.preview.csb.app/todos

// Tämä reitti tulostaa selaimelle  json muodossa tietokannan tiedot.    Tämä toimii ok.
//[{"_id":"63fdd17f5a1ff2ace906b165","text":"Muista opetella Javascript-ohjelmointia!","__v":0},
//{"_id":"63fe05c040442b3910a5d47a","text":"Muista opetella Javascript-ohjelmointia!","__v":0}]
app.get("/todos", async (request, response) => {
  const todos = await Todo.find({});
  response.json(todos);
});

app.get("/todos/:id", async (request, response) => {
  const todo = await Todo.findById(request.params.id);
  if (todo) response.json(todo);
  else response.status(404).end();
});





app.put('/todos/:id', async (request, response) => {     // MUOKKAA   PUT  REITTI,   editTodo(id),     muokkaa olemassa olevaa id:tä  mongodb:ssä.  tallettaa id:lle uuden arvon
  const { text } = request.body
  const todo = {
      text: text
  }
  const filter = { _id: request.params.id }
  const updatedTodo = await Todo.findOneAndUpdate(filter, todo, {
      new: true
  })
  response.json(updatedTodo) 
})





app.delete("/todos/:id", async (request, response) => {
  const deletedTodo = await Todo.findByIdAndRemove(request.params.id);
  if (deletedTodo) response.json(deletedTodo);
  else response.status(404).end();
});


// app listen port 3000
app.listen(port, () => {
  console.log("Kuuntelen porttia 3000");
});
