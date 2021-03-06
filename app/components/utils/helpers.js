// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to scrape articles.
  runQuery: function(articleCollector) {

    console.log(articleCollector);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url +- '?' + $.param({
      'authKey',
      'q': terms.search
      'begin_date': terms.start,
      'end_date': terms.end,
      'fl': "web_url,headline,pub_date"
    });
  //   api-key=" +
  // authKey + "&q=";
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      //response.docs[i].headline.main (title)
        //response.docs[i].web_url(url)
        //response.docs[i].pub_date(publication date)
      
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(articleCollector) {
    return axios.post("/api", { title: title, date: date, url: url });
    //need to add 3 things getting passed through here
  }
};

// We export the API helper
module.exports = helper;
