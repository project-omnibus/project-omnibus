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
    var query ="";

    if (userProfile.hasOwnProperty('keywords')) {
      query = query + userProfile.keywords;
    };

    if (userProfile.hasOwnProperty("likeGenre")){
      query = query + "+subject:" + userProfile.likeGenre;
    }

    if (userProfile.hasOwnProperty("readBook")){
      query = query + '-' + userProfile.readBook;
    }

    if (userProfile.hasOwnProperty("wantGenre")){
      query = query + '+subject:' + userProfile.wantGenre;
    }

    if(query.length==0){
      res.status(400).json('There is no query made')
    } else{
      console.log(query)
      req.queryString = query;
      log.info("query successfully made with " + query)
      next();
    }

  }

}

exports.searchBooks = function (req,res){

  req.query.key = env.googleApiKey;
  req.query.orderBy = 'relevance';
  req.query.maxResults = '5';
  req.query.q = req.queryString;

  console.log(req.query.q);

  request({
    uri: `https://www.googleapis.com/books/v1/volumes`,
    qs: req.query,
    json: true
  })
    .then(response => {
      const topRelatedBooks = _.map(response.items, (item) => {
        return item.volumeInfo.title;
      });

      log.info(`Found related books: [${topRelatedBooks.join(', ')}]`);
      res.json({
        relatedBooks: topRelatedBooks
      });
    })
    .catch(err => {
      log.info(err);
      res.status(err.statusCode)
        .json(err.error);
    });
}
