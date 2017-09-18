const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT");
  next();
});

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/todos', function (req, res) {
  var todos = fs.readFileSync('todos.json');
  res.send(JSON.parse(todos).todos);
})

app.post('/todos', function (req, res) {
  var dataString = fs.readFileSync('todos.json');
  var data = JSON.parse(dataString);

  //TODO: does this really work if list is empty?
  var id = 1 + Math.max.apply(Math, data.todos.map(function(item) {return item.id;}));

  data.todos.push({
    text: req.body.text,
    done: false,
    id: id
  })

  fs.writeFileSync('todos.json', JSON.stringify(data), 'utf8');

  // TODO: check file write success
  res.status(200).json("New item saved");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
