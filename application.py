import os
import requests

from questionPath.questionmain import *

from flask import Flask, session, render_template
from flask_socketio import SocketIO, emit
from flask_session import Session


#start up code

engine = create_engine(os.getenv("OMNIBUS_DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, manage_session=False)



app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#make the question objects for the session
numQuestions = db.execute("SELECT * FROM question_table").rowcount
questionList =[]

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
	questionList.append(q1)

'''
userinput = ""
while userinput != "no":
	questionrelevancylist = findmaxrelevancy(questionList)
	if questionrelevancylist['value']<=0:
		print("There are no more relevant questions. Goodbye")
		break	
	questionO=findquestion(questionList,questionrelevancylist['index'])
	print(questionO.text)
	userinput = input("Answer: ")
	assignrelevancy(questionO,questionList)
'''
@app.route("/")
def index():
	pythontext = "Hello World"
	return render_template("index.html", text=pythontext)

@socketio.on("chatbot think")
def chatBotQuestion(userResponse):
	#the question the user just responded to
	prevQuestion = userResponse['question'];

	#user's response
	response = userResponse['response'];

	questionPackage = {'text': "", 'possibleAnswers': []};

	#get the indices for the most relevant questions
	questionRelevancyList = findMaxRelevancy(questionList)
	if questionRelevancyList['value']<=0:
		questionPackage.text = "There are no more relevant questions. Goodbye";	

	#get a question object that has the highest relevancy
	questionObject = findQuestion(questionList,questionRelevancyList['index']);

	#assemble package to be sent to client browser
	questionPackage['text'] = questionObject.text;	
	questionPackage['possibleAnswers'] = questionObject.possibleAnswer;

	#update relevancy based on the question just asked and the overall question list
	assignRelevancy(questionObject,questionList);

	emit("chatbot question", questionPackage, broadcast=True);

if __name__ == '__main__':
    app.run(debug=True)