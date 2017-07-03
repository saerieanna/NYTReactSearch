// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var request = require("request");

mongoose.Promise = Promise;

// Require History Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://heroku_0s3r9ctl:66jauu6pls00846getav0f482e@ds137882.mlab.com:37882/heroku_0s3r9ctl");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// app.get("/api", function(req, res) {

//   // We will find all the records, sort it in descending order, then limit the records to 5
//   Article.find({}).sort([
//     ["date", "descending"]
//   ]).limit(5).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });

// This is the route we will send POST requests to save each article.
// app.post("/api", function(req, res) {
//   console.log("BODY: " + req.body.Article); //change to article

//   // Here we'll save the article based on the JSON input.
//   Article.create({
//     title: req.body.title,
//     date: req.body.date,
//     url: req.body.url
//   }, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Saved Search");
//     }
//   });
// });

// This is the route we will send GET requests to retrieve our saved articles.
app.get("/api/saved",function(req,res) {
Article.find({})
.exec(function(err, doc) {
  if(err) {
    console.log(error)
  }
  else {
    res.send(doc);
  }
})
});
// This is the route we will send POST requests to save each article the user hits the "save" button for.
app.post("/api/saved", function(req,res) {
  var newArticle = new Article(req.body);

  var title = req.body.title;
  var date = req.body.date;
  var url = req.body.url;

  newArticle.save(function(err,doc) {
    if(err) {
      console.log(err)
    }
    else {
      res.send(doc._id);
    }
  });

});
//This is the route we will send POST requests to delete an article the user hits the "delete" button for.
app.delete("/api/saved", function(req,res) {
var url = req.param('url');
Article.find({"url": url}).remove().exec(function(err,date) {
  if (err) {
    console.log(err);
  }
  else {
    res.send("Deleted");
  }
});
});

//* redirect to public/index.html
// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
