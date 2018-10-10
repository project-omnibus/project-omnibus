import panda
class question

index = 0
text = "this is the text of the question"
response_type = 0 # type of response expected, 0 for written, 1 for multiple choice
possible_responses = [] #array of strings
followUpBy = [] #array of integers for the questions that can follow this 
relevancy = 100 #the current relevancy assignment for this question
intent = [] #array of strings that specifies what this question asks for
similarTo = [] #array of integer for the questions that is similar to this
specificity=[] #an integer that indicate how specific or pointed the question is. Should general go from less specific to more specific questions


def makeQuestion(questionarray) #the input to this function needs to be a panda data frame of 1 row
	this.followUpBy = questionarray['followUpBy']
	this.possible_responses = questionarray['Possible Answer']
	if len(possible_responses) == 0:
		this.response_type = 0
	else:
		this.response_type = 1
	this.similarTo = questionarray['similarTo']






	
