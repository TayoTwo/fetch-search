// init project
var express = require('express');
const fetch = require("node-fetch");
var async  = require('express-async-await');
var fs = require('fs');
var app = express();
app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {

  res.sendFile(__dirname + '/views/index.html');

});

app.get('/api/photos', async function(req, res) {

  console.log(`Requesting page ${req.query.page}`);

  var page = req.query.page;
  var index = req.query.index;
  var json = req.query.json;

  var data = await fetchData(page);
  if(page != undefined){
      if(index != undefined){

        if(json == undefined || json == "false"){

          data = [...data][index].download_url;
          res.setHeader("Content-Type", "text/html");

          res.write('<html><body><img src="')
          res.write(data);
          res.end('"/></body></html>');

        } else if(json == "true") {

            data = [...data][index];

        }

      }
  } else {

    res.status(404).send("Page not found");

  }

  res.send(data);
//
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
