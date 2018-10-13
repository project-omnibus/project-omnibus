
const message = userResponse.message; //assume userResponse is a JSON object with a 'message' key
let userRecProfile = {keyWordList: []};

const BOTNAME = 'Bot';

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

	//display bot's question
	const botLabel = document.createElement('dt')
    botLabel.innerHTML=BOTNAME;

    const messageChunk = document.createElement('dd')
    messageChunk.innerHTML=`${QuestionObject.text}`;

    document.getElementById("messages-view").append(botLabel);
    document.getElementById("messages-view").append(messageChunk);

    //show possible responses if the Question object has a few
    if(!(QuestionObject.possibleReponses==NULL)){
    	//hide user message input
    	document.getElementById("message-form").hidden = true;

    	//for each possible response, display a button
    	for response in possibleReponses{
    		const responseButton = document.createElement('button')
    		responseButton.innerHTML = response;
    		document.getElementById("button-menu").append(responseButton);
    	}
    	
    }
    else{
    	//make sure user message input is shown 
    	document.getElementById("message-form").hidden = false;
    }
}
function parseUserMessage (message){
	//parse UserResponse object's message.

	//convert all characters in message to lowercase

	//for now, this will just remove words like 'the' and 'a' as well as punctuation to generate a list of keywords
	const definiteArticles = ['the']
	const indefiniteArticles = ['a', 'an']
	const infinitives = ['is','be','am','are','do']
	const auxVerbs = ['be', 'have', 'will', 'shall', 'would', 'should', 'can', 'could', 'may', 'might', 'must', 'ought'];
	const pronouns = ['i','you','me','my','he','she','they','myself','yourself','himself','herself','itself','it','him','her','we','us','them','ourselves','yourselves','themselves']
	const prepositions = ['on', 'at', 'in', 'of', 'to', 'for', 'with', 'over', 'by']
	const conjunctions = ['and', 'but', 'or', 'so', 'for', 'yet', 'either', 'neither', 'nor', 'although', 'after', 'before', 'because', 'how', 'if', 'once', 'since', 'that', 'until', 'unless', 'when', 'while', 'where', 'whether', 'however', 'therefore', 'moreover', 'then', 'otherwise', 'nevertheless', 'instead', 'meanwhile', 'likewise']

	const nonkeywords =
		definiteArticles.concat(
			indefiniteArticles,
			infinitives,
			auxVerbs,
			pronouns,
			prepositions,
			conjunctions
		);

	const punctuation = ['.','"',',','/','?',':',';','!','(',')']; //except apostrophe

	const separators = punctuation.concat([' ','/']);

	let keywords = [];
	let word = '';

	for (var i = 0; i < message.length; i++) {
		
		//for char in message
		const char = message.charAt(i)
		
		if (separators.includes(char)){
			//if the char is a separator or in the punctuation array
			if((word != '') && !(nonkeywords.includes(word))){
				//and if the word is not blank and in the nonkeywords array
				//store word into keywords list
				keywords = keywords.push(word);
				//clear words variable
				word = '';
			}
			
			//otherwise continue to the next char
		}
		else{
			//if the char is not a separator or in the punctuation array
			//store letter into a word variable
			word = word + char;
		}
	}
	
	const parsedMessage = keywords;

	//return keywords list when done
	return parsedMessage;

	//future versions will probably just identify each of the sentences in the user's message.
	//maybe even identify subjects, objects, and verbs/actions
}


function interpretUserMessage (parsedMessage, QuestionObject){
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
	//how does this relate to the question? (QuestionObject)
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
	for (var i = 0; i < meaningMap.length; i++) {
		userRecProfile.keyWordList.push(meaningMap[i])
	}

	//future versions will make specific updates to specific attributes of a UserRecProfile, as the UserRecProfile becomes more nuanced
	//how the recommendation profile is assembled may qualify as part of the interpretation.
	//the exact additions to a profile will depend on how the message is interpreted

	
}


function updateChatbotConfidence(){
	//based on user response, particularly to confirmation questions
}