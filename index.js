// init project
var express = require('express');
const fetch = require("node-fetch");
var async  = require('express-async-await');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {

  res.sendFile(__dirname + '/views/index.html');
  
});

app.get('/api/photos/:page/json', async function(req, res) {

  console.log(`Requesting page ${req.params.page}`);

  var data = await fetchData(req.params.page);
  res.send(data);
//
});

app.get('/api/photos/:page/:id/json', async function(req, res) {

  console.log(`Requesting json of photo #${req.params.id} on page ${req.params.page}`);

  var data = await fetchData(req.params.page);
  res.send([...data][req.params.id]);

});

app.get('/api/photos/:page/:id', async function(req, res) {

  console.log(`Requesting photo #${req.params.id} on page ${req.params.page}`);

  var data = await fetchData(req.params.page);
  res.send(`<img src="${[...data][req.params.id].download_url}"></img>`);

});

async function fetchData(req){

  const data = await fetch(`https://picsum.photos/v2/list?page=${req}&limit=96`)
  .then(res => res.json());

  return data;

}

// listen for requests :)
var listener = app.listen((process.env.PORT || 3000), function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
