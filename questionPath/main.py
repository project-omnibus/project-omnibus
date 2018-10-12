import pandas as pd
from question import *

questionlist = pd.read_csv('questions.csv')
questionrow = pd.Series(questionlist.iloc[1])
questiontext = questionrow.get('Question')
qdict=questionrow.to_dict()
s={'followUpBy':1}

print(qdict)

def makeQuestion(qObject,questionarray): #the input to this function needs to be a dictionary variable of 1 row of the data
		qObject.followUpBy = questionarray['followUpBy']
		qObject.possible_responses = questionarray['Possible Answer']
		if len(qObject.possible_responses) == 0:
			qObject.response_type = 0
		else:
			qObject.response_type = 1
		qObject.similarTo = questionarray['similarTo']
		qObject.text = questionarray['Question']


q1 = question()
makeQuestion(q1,qdict)
#q1.runtest(1)

print(q1.followUpBy)