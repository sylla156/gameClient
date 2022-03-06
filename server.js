const express = require("express");
let ejs = require("ejs");
const createPlayer = require("./models/createPlayer");
const playerConnect = require("./models/playerConnect");
const createPlayers = require('./models/create/CreatePlayer');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { redirect } = require("express/lib/response");
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,__dirname + '/uploads/images');
  },
  filename: (req,file,cb) => {
    cb(null,(Date.now()+ file.originalname));
  }
})
const upload = multer({storage: storage});

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  if (request.cookies.connected === undefined) {
    response.cookie('connected',{
      connected: false,
      name: null,
      userId:null
    },{ maxAge: 900000, httpOnly: true })
    response.redirect('/')
  }
  const connected = request.cookies.connected.connected;
  const name = request.cookies.connected.name;
  const userId = request.cookies.connected.userId;
  response.render("index", { page: "home", connected: connected ,name: name, userId: userId});
});

app.get("/register", (request, response) => {
  const connected = request.cookies.connected.connected;
  if(connected === true) {
    response.send('error')
  } else {
    response.render('index', {page: 'register',connected: connected})
  }
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
    response.redirect('/login')
  } else if (typeof message === "object") {
    response.render("index", {
      page: "register",
      email: message.email,
      password: message.password,
    });
  }
});

app.get("/login", (request, response) => {
  const connected = request.cookies.connected.connected;
  if(connected === true) {
    response.send('error')
  } else {
    response.render('index', {page: 'login', connected:connected})
  }
});

app.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  playerConnect.check(email, password, (results) => {
    if (results.length === 0 ) {
      response.render("index", { page: "login", error: true});
    }else{
      response.cookie('connected',{
        connected: true,
        name: results[0].username,
        userId: results[0].id
      },{ maxAge: 900000, httpOnly: true })
      response.redirect('/')
    }
  });

});

app.get('/logout', (request, response) => {
  response.cookie('connected',{
    connected:false,
    name: null,
    userId: null,
  },{ maxAge: 900000, httpOnly: true });
  response.redirect('/');
})

app.get("/CreatePlayer", (request, response) => {
  const {connected , name,userId } = request.cookies.connected;
if(connected) {
 response.render("index", { page: "createPlayer",connected: connected, name: name ,userId:userId});
} else {
  response.send('erreur de la page')
}
});

app.get("/CreateTeam", (request, response) => {
  const {connected , name ,userId} = request.cookies.connected;
  if(connected) {
   response.render("index", { page: "createTeam", connected: connected, name:name ,userId:userId});
  } else {
    response.send('erreur de la page')
  }
});

app.get("/CreateForum", (request, response) => {
  const {connected , name, userId} = request.cookies.connected;
  if(connected) {
   response.render("index", { page: "createForum", connected: connected, name:name,userId:userId });
  } else {
    response.send('erreur de la page')
  }
});


app.post('/CreatePlayer',  upload.single('image') ,(request, response) => {
  const {playername, about, desc, game, level} = request.body;
  const fileName = request.file.filename;
  const {connected , name, userId} = request.cookies.connected;
  const message = createPlayers.create(fileName,playername,about,desc,game,level,userId);
  response.render("index", { page: "createPlayer", connected: connected, name:name ,userId:userId ,add: message});
})


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
