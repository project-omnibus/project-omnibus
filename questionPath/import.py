import csv
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(os.getenv("OMNIBUS_DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def main():
        f = open("question_table.csv")
        reader = csv.reader(f)
        for question, needUserInput, defaultRelevancy, questionType, dateCreated, questionID, specificity in reader:
                db.execute("INSERT INTO question_table (question, need_user_input, default_relevancy,\
                	question_type, date_created, question_id, specificity)\
                	 VALUES (:question, :needUserInput, :defaultRelevancy,\
                	:questionType, :dateCreated, :questionID, :specificity)",\
                	 {"question": question, "needUserInput": needUserInput, "defaultRelevancy": defaultRelevancy,\
                	  "questionType": questionType, "dateCreated": dateCreated, "questionID": questionID,\
                	  "specificity": specificity})
                db.commit()
                print(f'Added question {question}.')
                
if __name__ == "__main__":
    main()