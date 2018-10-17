import pandas as pd
from question import *
import csv
import os
import random

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(os.getenv("OMNIBUS_DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

#questionlist = pd.read_csv('questions.csv')
#questionrow = pd.Series(questionlist.iloc[1])
#questiontext = questionrow.get('Question')
#qdict=questionrow.to_dict()
#s={'followUpBy':1}

#wprint(qdict)

def makeQuestion(qObject,qDict,qfollowup,qsimilarto,qanswer): #the input to this function needs to be a dictionary variable of 1 row of the data
	qObject.text = qDict.question
	qObject.needUserInput = qDict['need_user_input']
	qObject.relevancy = qDict['default_relevancy']
	qObject.index = qDict['question_id']
	qObject.specificity = qDict['specificity']
	qObject.followUpBy = qfollowup
	qObject.similarTo = qsimilarto
	qObject.possibleAnswer = qanswer


#make the question objects for the session
numQuestions = db.execute("SELECT * FROM question_table").rowcount
questionlist =[]
#print(numQuestions)

for numRow in range(numQuestions):
	followuparray=[]
	similartoarray=[]
	possibleanswerarray=[]
	questionRow = db.execute("SELECT * FROM question_table WHERE question_id = :row",{"row":numRow+1}).fetchone()
	for followRow in db.execute("SELECT * FROM question_followup_table WHERE question_id = :row",{"row":numRow+1}).fetchall():
		followuparray.append(followRow.follow_up_by_id)
	for similartoRow in db.execute("SELECT * FROM question_similarto_table WHERE question_id = :row",{"row":numRow+1}).fetchall():
		similartoarray.append(similartoRow.similer_to_id)
	for possibleanswerRow in db.execute("SELECT * FROM question_possibleanswer_table WHERE question_id = :row",{"row":numRow+1}).fetchall():
		possibleanswerarray.append(possibleanswerRow.possible_answer)
	q1 = question()
	#print(questionRow)
	makeQuestion(q1,questionRow,followuparray,similartoarray,possibleanswerarray)
	questionlist.append(q1)

#print(questionlist[1].followUpBy)

#The following block chooses the next question to ask

def findmaxrelevancy(qObjectList):
	relevancylist=[]
	maxrelevancyindex=[]
	j=0
	for ques in qObjectList:
		relevancylist.append(ques.relevancy)
	m=max(relevancylist)
	#print(m)
	for rel in relevancylist:
		if rel==m:
			maxrelevancyindex.append(j)
		j+=1
	print(maxrelevancyindex)
	return maxrelevancyindex

def assignrelevancy(qObject, qObjectList):
	qObjectList[qObject.index-1].relevancy = 0
	if len(qObject.followUpBy) != 0:
		for qfollow in qObject.followUpBy:
			qObjectList[qfollow-1].relevancy=100

def findquestion(qObjectList,relList):
	if len(relList) == 1:
		return qObjectList[relList[0]]
	elif len(relList) > 1:
		return qObjectList[relList[random.randint(0,len(relList)-1)]]
	else:
		x=random.randint(0,23)
		while qObjectList[x].relevancy == 0:
			x=random.randint(0,23)
		return qObjectList[x]


userinput = ""
while userinput != "no":
	#print(questionO.relevancy)
	#print(questionlist[questionO.index-1].relevancy)
	questionrelevancylist = findmaxrelevancy(questionlist)
	questionO=findquestion(questionlist,questionrelevancylist)
	print(questionO.text)
	print(questionO.followUpBy)
	userinput = input("Next Question?")
	assignrelevancy(questionO,questionlist)









#q1 = question()
#makeQuestion(q1,qdict)
#q1.runtest(1)

#print(q1.followUpBy)