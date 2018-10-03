class question

index = 0
text = "this is the text of the question"
response_type = "the type of response expected"
possible_responses = [] #array of strings
followUpBy = [] #array of integers for the questions that can follow this 
relevancy = 100 #the current relevancy assignment for this question
intent = [] #array of strings that specifies what this question asks for
similarTo = [] #array of integer for the questions that is similar to this
specificity=[] #an integer that indicate how specific or pointed the question is. Should general go from less specific to more specific questions


def makeQuestion(sqlinput)
	
