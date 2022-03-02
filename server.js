const express = require('express')
let ejs = require('ejs');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})