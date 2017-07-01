// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

app.get("/", function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


app.get("/new", function(req, res){
  var url = req.url.substring(5, req.url.length);
  if(url.length == 0)
    res.end("Please Enter a proper Url");
  
  else{
    
  }
})

// handling requests
app.get("/new", function (req, res) {
  console.log("running");
  var response = {};
  res.send(req.url);
  var url = req.url.substring(0, req.url.length);
  if(validateUrl(url) == false) 
    response.error = "This url is not on the database.";
  
  else{
    MongoClient.connect(dbUrl, function(err, db){
      if(err) console.log("Unable to connect to MongoDB");
      else{
        var urlsColl = db.collection('urls');
        var randomNumber = (Math.random() * 1000).toSting();
        console.log(randomNumber+ ": " + url);
        urlsColl.insert({randomNumber: url});
        db.close();
        response.original_url = url;
        response.short_url = "https://url-shortener-microservice-moaz.glitch.me/" + randomNumber;
      }
    })
  }
  
  res.end(JSON.stringify(response));
});


var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
//(Focus on This Variable)
var dbUrl = 'mongodb://first:first@ds147072.mlab.com:47072/links';      
//(Focus on This Variable)

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', dbUrl);
    // do some work here with the database.
    
    //Close connection
    db.close();
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
