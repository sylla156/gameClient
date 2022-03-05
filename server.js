const express = require("express");
let ejs = require("ejs");
const createPlayer = require("./models/createPlayer");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.render("index", { page: "home" });
});

app.get("/register", (request, response) => {
  response.render("index", { page: "register" });
});

app.post("/register", (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const username = request.body.username;
  const email = request.body.email;
  const birthdate = request.body.birthdate;
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;
  const create = new createPlayer();
  const message = create.create(
    firstName,
    lastName,
    username,
    email,
    birthdate,
    password,
    confirmPassword
  );
  if (message === true) {
    response.render("index", { page: "login" , register: true});
  }else if(typeof message === 'object') {
  response.render("index", { page: "register",email: message.email, password: message.password });
  }
});

app.get("/login", (request, response) => {
  response.render("index", { page: "login" });
});

app.get("/CreatePlayer", (request, response) => {
  response.render("index", { page: "createPlayer" });
});

app.get("/CreateTeam", (request, response) => {
  response.render("index", { page: "createTeam" });
});

app.get("/CreateForum", (request, response) => {
  response.render("index", { page: "createForum" });
});

app.get("/forums", (request, response) => {
  response.render("index", { page: "forums" });
});

app.get("/physical", (request, response) => {
  response.render("index", { page: "physical" });
});

app.get("/digital", (request, response) => {
  response.render("index", { page: "digital" });
});

app.get("/teams", (request, response) => {
  response.render("index", { page: "teams" });
});

app.get("/players", (request, response) => {
  response.render("index", { page: "players" });
});

app.get("/player", (request, response) => {
  response.render("index", { page: "player" });
});

app.get("/team", (request, response) => {
  response.render("index", { page: "team" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
