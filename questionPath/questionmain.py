from questionPath.question import *
import csv
import os
import random

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


def makeQuestion(qObject,qDict,qfollowup,qsimilarto,qanswer):
	#make question object given database rows
	#the input to this function needs to be a dictionary variable of 1 row of the data 
	qObject.text = qDict.question
	qObject.needUserInput = qDict['need_user_input']
	qObject.relevancy = qDict['default_relevancy']
	qObject.index = qDict['question_id']
	qObject.specificity = qDict['specificity']
	qObject.followUpBy = qfollowup
	qObject.similarTo = qsimilarto
	qObject.possibleAnswer = qanswer

#The following block chooses the next question to ask

def findMaxRelevancy(qObjectList):
	#array of relevancy values for each question in qObjectList
	relevancylist=[]

	#array of question indices that have the maximum relevancy value
	maxrelevancyindex=[]

	j=0
	for ques in qObjectList:
		relevancylist.append(ques.relevancy)

	#the maximum relevancy value in the list
	m=max(relevancylist)

	#assemble array of question indices that have the maximum relevancy value
	for rel in relevancylist:
		if rel==m:
			maxrelevancyindex.append(j)
		j+=1

	#return a dictionary with an array of indices of question with the max relevancy value, the maximum relevancy value, and the array of relevancy values in all questions of qObjectList
	maxrelList = dict()
	maxrelList['index'] = maxrelevancyindex
	maxrelList['value'] = m
	maxrelList['array'] = relevancylist
	return maxrelList

def assignRelevancy(qObject, qObjectList):
	#set the question's relevancy to 0 (usually the question that has just been asked, so it can't be repeated again)
	qObjectList[qObject.index-1].relevancy = 0

	#assign relevancy to follow up questions
	if len(qObject.followUpBy) != 0:
		for qfollow in qObject.followUpBy:
			qObjectList[qfollow-1].relevancy=100*(qObjectList[qfollow-1].relevancy-9)

	#decrease relevancy for all questions based on their specificity
	for qObj in qObjectList:
		qObj.relevancy = qObj.relevancy - qObj.specificity/20


def findQuestion(qObjectList,relList):
	#given a list of questions and an array of indices of relevant question
	#return a question object
	if len(relList) == 1:
		return qObjectList[relList[0]]
	elif len(relList) > 1:
		#if there are more than one relevant question with the highest relevancy value
		#pick a random question of that relevancy
		return qObjectList[relList[random.randint(0,len(relList)-1)]]
	else:
		#if there are no relevant questions
		#pick a random question with relevancy greater than 0 from the original question list
		x=random.randint(0,23)
		while qObjectList[x].relevancy == 0:
			x=random.randint(0,23)
		return qObjectList[x]

if __name__ == '__main__':
	engine = create_engine(os.getenv("OMNIBUS_DATABASE_URL"))
	db = scoped_session(sessionmaker(bind=engine))

	#make the question objects for the session
	numQuestions = db.execute("SELECT * FROM question_table").rowcount
	questionlist =[]

	for numRow in range(numQuestions):
		# this loads the database tables into a giant array of objects that resembles how we organized it in a spreadsheet
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
		makeQuestion(q1,questionRow,followuparray,similartoarray,possibleanswerarray)
		questionlist.append(q1)

	userinput = ""
	while userinput != "no":
		questionrelevancylist = findMaxRelevancy(questionlist)
		if questionrelevancylist['value']<=0:
			print("There are no more relevant questions. Goodbye")
			break	
		questionO=findQuestion(questionlist,questionrelevancylist['index'])
		print(questionO.text)
		userinput = input("Answer: ")
		assignRelevancy(questionO,questionlist)