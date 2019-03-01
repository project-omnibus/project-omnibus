var env = require('../env');
var log = require('../log');
var Botkit = require('botkit');

var controller = Botkit.anywhere({});

exports.makeConversation = function(req,res){
  log.info("chatBot make conversation is called")

  var message = req.body

  log.info(message)

  controller.hears(['hello','hi','howdy','hi there','hey'],['message_received'],function(bot,message) {
    var response = bot.reply(message,'Hello!');
    log.info(response)
  })

  res.json('response');

}
