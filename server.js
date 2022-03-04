const express = require('express')
let ejs = require('ejs');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index', {page: 'home'});
})

app.get('/register', (request, response) => {
  response.render('index', {page: 'register'})
})


app.get('/login', (request, response) => {
  response.render('index', {page: 'login'})
})


app.get('/CreatePlayer', (request, response) => {
  response.render('index', {page: 'createPlayer'})
})

app.get('/CreateTeam', (request, response) => {
  response.render('index', {page: 'createTeam'})
})

app.get('/CreateForum', (request, response) => {
  response.render('index', {page: 'createForum'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})