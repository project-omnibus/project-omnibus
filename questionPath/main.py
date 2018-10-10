import pandas as pd
questionlist = pd.read_csv('questions.csv')
questionrow = questionlist.iloc[[1]]
print(questionrow['Question'])