
const message = userResponse.response; //assume userResponse is a JSON object with a 'response' key
let userRecProfile = {keyWordList: []};

const BOTNAME = 'Bot';

function presentQuestionAnswerFields (questionPackage){
	//given a question package JSON object
	//display bot's question and possible answers, if applicable, as buttons


	//create HTML element for bot's name
	const botLabel = document.createElement('dt')
    botLabel.innerHTML=BOTNAME;

    //create HTML element for bot's message
    const messageChunk = document.createElement('dd')
    messageChunk.innerHTML=`${questionPackage.text}`;

    document.getElementById("messages-view").append(botLabel);
    document.getElementById("messages-view").append(messageChunk);

    //show possible responses if the question JSON object has a few
    if(!(questionPackage.possibleAnswers==[])){
    	//hide user message input
    	document.getElementById("message-form").hidden = true;

    	//for each possible response, display a button
    	for response in questionPackage.possibleAnswers{
    		const responseButton = document.createElement('button')
    		responseButton.innerHTML = response;
    		//assign the buttons some on click behavior


    		document.getElementById("button-menu").append(responseButton);
    	}
    	
    }
    else{
    	//make sure user message input is shown 
    	document.getElementById("message-form").hidden = false;
    }
}
function removeNonKeywords(message){
	//removes words like "the"/"and" from the user's message to identify keywords for searching through book recommendations

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
	
	return keywords;
}
function parseUserMessage (message){
	//parse UserResponse object's message.

	//convert all characters in message to lowercase

	//for now, this will just pass the user's reponse message straight through.
	const parsedMessage = message;
	return parsedMessage;

	//future versions will try to reduce noise by detecting spelling errors and removing jarbled text (e.g. "adjfiasj123")
}

function interpretUserMessage (parsedMessage, questionPackage){
	//take a parsed message (user's message after some processing from parseUserMessage function)

	//for now, this will just create a simple Question and Response pair in a JSON object called UserResponseObject
	const userResponseObject = {'question': questionPackage.questionText, 'response': parsedMessage};
	return userResponseObject;

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



function addToUserRecProfile (userResponseObject){
	//for now, this will take the response from the UserResponseObject and take out all the "nonkeywords": 'the', 'for', etc.
	//And then add those keywords to the UserRecProfile

	const keywords = removeNonKeywords(userResponseObject.response);

	//update the user recommendation profile
	for (var i = 0; i < meaningMap.length; i++) {
		//locally add to a JSON object
		userRecProfile.keyWordList.push(keywords[i])
		//emit to server with the JSON object
	}

	//it COULD also note duplicate keywords and keep a count of keywords that keep occurring in the user's response

	return false;
	//future versions will make specific updates to specific attributes of a UserRecProfile, as the UserRecProfile becomes more nuanced
	//how the recommendation profile is assembled may qualify as part of the interpretation.
	//the exact additions to a profile will depend on how the message is interpreted

	
}


function updateChatbotConfidence(){
	//based on user response, particularly to confirmation questions
}