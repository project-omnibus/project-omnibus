import csv
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(os.getenv("OMNIBUS_DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def main():
        f = open("followupby_table.csv")
        reader = csv.reader(f)
        for question_id, followupby_id in reader:
                db.execute("INSERT INTO question_followup_table (question_id, follow_up_by_id)\
                	 VALUES (:question_id, :follow_up_by_id)",\
                	 {"question_id": question_id, "follow_up_by_id": followupby_id})
                db.commit()
                print(f'Added question id {question_id}.')
                
if __name__ == "__main__":
    main()