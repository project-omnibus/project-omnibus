
const message = userResponse.message; //assume userResponse is a JSON object with a 'message' key
let userRecProfile = {keyWordList: []};

function presentQuestionAnswerFields (QuestionObject){
	/*Question Class

	Attribute:
	index 			[variable type: double, {enum} this is the index of the question in the database]
	Text 			[variable type: string, max 100 char]
	Response-type 		[variable type: string, {options}]
	Possible-reponses 	[variable type: string, if "NULL"-->open text box response]
	FollowUpBy 		[variable type: array-double {enum}, the index of questions that this question is a followed up by]
	Relevancy 		[variable type: double {1-100}, the current relevancy rating of the question]
	Intent			[variable type: string, {options}]
	*/

}
function parseUserMessage (message){
	//parse UserResponse object's message.
	//for now, this will just remove words like 'the' and 'a' as well as punctuation to generate a list of keywords

	const nonkeywords = [];
	const punctuation = []; //except apostrophe

	const keyWords = [];

	//for char in message
	//if the char is not a space or in the punctuation array
	//store letter into a word variable
	//if the char is a space or in the punctuation array
	//and if the word is not in the nonkeywords array
	//store word into keywords list

	//return keywords list when done
	return false;

	//future versions will probably just identify each of the sentences in the user's message.
}


function interpretUserMessage (parsedMessage){
	//Interpret User's Response
	//take a parsed message (user's message after some processing from parseUserMessage function)
	//for now, this will just pass the keyword list (a simply "parsed" message) to the addToUserRecProfile function
	const meaningMap = parsedMessage;

	//it COULD also note duplicate keywords and keep a count of keywords that keep occurring in the user's response

	//return 
	return meaningMap;

	//future versions will attempt to "traverse" the web of meaning of the user's message
	//words/sentences are "pointers." they aren't "inherently meaningful," they reference the actual things.
	//how do the sentences relate to one another? what details/specific ideas do they indicate? what's the overall "thesis" of the message?
	//is there a tone to the response?
	//how does this fit in the larger chat history (chatbot questions and user responses)
	//how does this fit with the user recommendation profile constructed so far?
	//what's the user REALLY getting at?

	//use grammar rules to separate each sentence into chunks
	//use vocabulary to translate chunks into internal vocabulary
	//reassemble chunks into a single idea for that sentence
	//synthesize ideas from all sentences of the message into a gist
	//synthesize that gist with the all past gists in the current conversation, and previous conversations, and the user profile
}



function addToUserRecProfile (meaningMap){
	//Add to UserRecommendationProfile Object
	//for now, this will just append keywords to an array of keywords in the UserRecProfile

	//update the user recommendation profile
	for (var i = meaningMap.length - 1; i >= 0; i--) {
		userRecProfile.keyWordList.push(meaningMap[i])
	}

	//future versions will make specific updates to specific attributes of a UserRecProfile, as the UserRecProfile becomes more nuanced
	//how the recommendation profile is assembled may qualify as part of the interpretation.
	//the exact additions to a profile will depend on how the message is interpreted

	
}


function updateChatbotConfidence(){
	//based on user response, particularly to confirmation questions
}