// init project
var express = require('express');
const fetch = require("node-fetch");
var async  = require('express-async-await');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/photos/:page/json', async function(req, res) {

  console.log("Received");
  // res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

  res.send(await fetchData(req.params.page));

});

async function fetchData(req){

  const data = await fetch(`https://picsum.photos/v2/list?page=${req}&limit=96`)
  .then(res => res.json());
  console.log(data);

  return data;

}


// app.get('/api/photos/:page', function(req, res) {
//
//   res.send("Page: " + req.params.page);
//
// });

app.get('/api/photos/:page/:id', function(req, res) {

  res.send(req.params);

});

// listen for requests :)
var listener = app.listen((process.env.PORT || 3000), function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
