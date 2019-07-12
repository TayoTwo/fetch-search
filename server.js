// init project
var express = require('express');
const fetch = require("node-fetch");
var async = require('express-async-await');
var path = require('path');
const http = require("http");
const https = require("https");
var through = require('through');
var fs = require('fs');
var request = require('request');
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
  var url = (index != undefined) ? `http://picsum.photos/v2/list?page=${page}&limit=${index+1}`: `http://picsum.photos/v2/list?page=${page}&limit=96`;
  var data = await fetch(url).then(response => response.json());
  var thisThrough = through(function write(chunk) {
      this.emit('data', chunk);
      console.log(chunk);
    },
    function end() { //optional
      this.emit('end');
    });

  if (data.length != 0) {
    if (index < [...data].length && index != undefined) {
      if (json == undefined || json == "false") {

        data = [...data][index].download_url;
        request(data).pipe(thisThrough).pipe(res);

      } else if (json == "true") {

        data = [...data][index];
        console.log(data);
        res.send(data);

      } else {

        res.status(404).send("Image not found");

      }

    } else if(index >= [...data].length){

      res.status(404).send("Image not found");

    } else {

      console.log(data);
      res.send(data);

    }

  } else {

    res.status(404).send("Page not found");

  }

  //
});

// listen for requests :)
var listener = app.listen((process.env.PORT || 3000), function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
