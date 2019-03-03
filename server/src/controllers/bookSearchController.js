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

    if (userProfile.hasOwnProperty("likeBook")){
      for (var i=0;i<userProfile.wantGenre.length;i++){
        likeGenreQuery = likeGenreQuery + "+" + userProfile.likeBook[i];
        readBookQuery = readBookQuery + "+" + userProfile.likeBook[i];
      }
    }

    if((keywordsQuery.length+likeGenreQuery.length+readBookQuery.length+wantGenreQuery.length)==0){
      res.status(400).json('There is query')
    } else {
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
  var topRelatedBooksKeywords=[];
  var topRelatedBooksLikeGenre=[];
  var topRelatedBooksReadBook=[];
  var topRelatedBooksWantGenre=[];
  var topRelatedBooksIDKeywords=[];
  var topRelatedBooksIDLikeGenre=[];
  var topRelatedBooksIDReadBook=[];
  var topRelatedBooksIDWantGenre=[];

  if (req.keywordsQuery.length != 0){
    topRelatedBooksKeywords = await googleSearchBooks(req.keywordsQuery);
    topRelatedBooksIDKeywords = topRelatedBooksKeywords.map(items => items.id);
  }

  if (req.likeGenreQuery.length != 0){
    topRelatedBooksLikeGenre = await googleSearchBooks(req.likeGenreQuery);
    topRelatedBooksIDLikeGenre = topRelatedBooksLikeGenre.map(items => items.id);
    //console.log(topRelatedBooksIDLikeGenre)
  }

  if (req.readBookQuery.length != 0){
    topRelatedBooksReadBook = await googleSearchBooks(req.readBookQuery);
    topRelatedBooksIDReadBook = topRelatedBooksReadBook.map(items => items.id);
  }

  if (req.wantGenreQuery.length != 0){
    topRelatedBooksWantGenre = await googleSearchBooks(req.wantGenreQuery);
    topRelatedBooksIDWantGenre = topRelatedBooksWantGenre.map(items => items.id);
  }

  var uniqueIds = _.union(topRelatedBooksIDKeywords, topRelatedBooksIDLikeGenre, topRelatedBooksIDReadBook, topRelatedBooksIDWantGenre);

  console.log(topRelatedBooksIDReadBook)
  console.log(topRelatedBooksIDKeywords)

  var relevancyTable = [];
  for (var i =0; i<uniqueIds.length; i++){
    var relevancyTableEle = {"bookId":uniqueIds[i], "keywordsRel":-1, "likeGenreRel":-1, "readBookRel":-1,"wantGenreRel":-1, "totalRel":0};
    if(topRelatedBooksIDKeywords.length != 0){
      relevancyTableEle.keywordsRel = _.indexOf(topRelatedBooksIDKeywords,relevancyTableEle.bookId);
    }
    if(topRelatedBooksIDLikeGenre.length != 0){
      relevancyTableEle.likeGenreRel = _.indexOf(topRelatedBooksIDLikeGenre, relevancyTableEle.bookId);
    }
    if(topRelatedBooksIDReadBook.length != 0){
      relevancyTableEle.readBookRel = _.indexOf(topRelatedBooksIDReadBook, relevancyTableEle.bookId);
    }
    if(topRelatedBooksIDWantGenre.length != 0){
      relevancyTableEle.wantGenreRel = _.indexOf(topRelatedBooksIDWantGenre, relevancyTableEle.bookId);
    }

    relevancyTableEle.totalRel = existInArray(relevancyTableEle.keywordsRel)*(40-relevancyTableEle.keywordsRel) + existInArray(relevancyTableEle.likeGenreRel)*(40-relevancyTableEle.likeGenreRel) - existInArray(relevancyTableEle.readBookRel)*(40-relevancyTableEle.readBookRel) + existInArray(relevancyTableEle.wantGenreRel)*(40-relevancyTableEle.wantGenreRel);

    relevancyTable.push(relevancyTableEle)
  }

  console.log(relevancyTable)


  var finalRelevancyTable = _.sortBy(relevancyTable, 'totalRel');
  var finalRelevancyTable = finalRelevancyTable.reverse();

  //return the top 10 books
  var result = [];
  for(i=0;i<10;i++){
    if(finalRelevancyTable[i].keywordsRel != -1){
      result.push(topRelatedBooksKeywords[finalRelevancyTable[i].keywordsRel])
    }else if(finalRelevancyTable[i].likeGenreRel != -1){
      result.push(topRelatedBooksLikeGenre[finalRelevancyTable[i].likeGenreRel])
    }else {
      if (finalRelevancyTable[i].readBookRel != -1){
        result.push(topRelatedBooksReadBook[finalRelevancyTable[i].readBookRel])
      }else if(finalRelevancyTable[i].wantGenreRel != -1){
        result.push(topRelatedBooksWantGenre[finalRelevancyTable[i].wantGenreRel])
      }
    }
  }
  log.info(result)
  //console.log(result)
  res.send(result);
}

function googleSearchBooks(queryString){
  let query={"key":env.googleApiKey, "orderBy":'relevance', "q":queryString, "maxResults":40};

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
      return topRelatedBooks;
    })
    .catch(err => {
      console.log(err);
      topIds = err;
    });
}

function existInArray(index){
  if (index <= -1){
    return 0;
  } else {
    return 1;
  }
}
