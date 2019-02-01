var env = require('../env');
var log = require('../log');
var request = require('request-promise');
var _ = require('underscore');

exports.createSearchTerms = function(req,res,next){
  log.info('createSearchTerms is called');
  if (!req.body.attribute || req.body.attribute.length === 0) { // check if the req is empty, therefore it is a new session and there has been no request yet. Make the initial user request
    log.info('there is no user profile yet, will respond error');
    const errorMessage = "Sorry you need to tell me something about yourself first";
    const erroCode = 400;
    res.status(erroCode).json(errorMessage);
  }
  else {
    log.info('there is a user profile, trying to form a query' + JSON.stringify(req.body.attribute))
    //extract all the fields in the attribute prop of the post from client
    var userProfile = req.body.attribute;
    var keywordsQuery ="";
    var likeGenreQuery ="";
    var readBookQuery = "";
    var wantGenreQuery ="";

    if (userProfile.hasOwnProperty('keywords')) {
      for (var i=0;i<userProfile.keywords.length;i++){
        keywordsQuery = keywordsQuery + "+" + userProfile.keywords[i];
      }
    };

    if (userProfile.hasOwnProperty("likeGenre")){
      for (var i=0;i<userProfile.likeGenre.length;i++){
        likeGenreQuery = likeGenreQuery + "+" + userProfile.likeGenre[i];
      }
    }

    if (userProfile.hasOwnProperty("readBook")){
      for (var i=0;i<userProfile.readBook.length;i++){
        readBookQuery = readBookQuery + "+" + userProfile.readBook[i];
      }
    }

    if (userProfile.hasOwnProperty("wantGenre")){
      for (var i=0;i<userProfile.wantGenre.length;i++){
        wantGenreQuery = wantGenreQuery + "+" + userProfile.wantGenre[i];
      }
    }

    if((keywordsQuery.length+likeGenreQuery.length+readBookQuery.length+wantGenreQuery.length)==0){
      res.status(400).json('There is query')
    } else{
      console.log(keywordsQuery)
      req.keywordsQuery = keywordsQuery;
      req.likeGenreQuery = likeGenreQuery;
      req.readBookQuery = readBookQuery;
      req.wantGenreQuery = wantGenreQuery;
      log.info("query successfully made with keywordsQuery: " + keywordsQuery + "likeGenreQuery: " + likeGenreQuery + "readBookQuery: " + readBookQuery + "wantGenreQuery: " + wantGenreQuery)
      next();
    }

  }

}

exports.searchBooks = async function (req,res){
  var topRelatedBooksKeywords;
  var topRelatedBooksLikeGenre;
  var topRelatedBooksReadBook;
  var topRelatedBooksWantGenre;

  if (req.keywordsQuery.length != 0){
    topRelatedBooksKeywords = await googleSearchBooks(req.keywordsQuery);
  }

  if (req.likeGenreQuery.length != 0){
    topRelatedBooksLikeGenre = await googleSearchBooks(req.likeGenreQuery);

  }

  if (req.readBookQuery.length != 0){
    topRelatedBooksReadBook = await googleSearchBooks(req.readBookQuery);
  }

  if (req.wantGenreQuery.length != 0){
    topRelatedBooksWantGenre = await googleSearchBooks(req.wantGenreQuery);
  }

  result = 'stii working on it';
  log.info(result)

  res.send(result);
}

function googleSearchBooks(queryString){
  let query={"key":'', "orderBy":'', "q":"", "maxResults"};
  query.key = env.googleApiKey;
  query.orderBy = 'relevance';
  query.q = queryString;
  query.maxResults = 40;

  return request({
    uri: `https://www.googleapis.com/books/v1/volumes`,
    qs: query,
    json: true
  })
    .then(response => {
      const topRelatedBooks = _.map(response.items, (item) => {
        return item;
      });

      console.log("successfully queried from google!")
      console.log(topRelatedBooks)
      return topRelatedBooks;
    })
    .catch(err => {
      console.log(err);
      topIds = err;
    });

}
