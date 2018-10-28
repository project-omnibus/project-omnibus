Question Class

Attribute:
index 			[variable type: double, {enum} this is the index of the question in the database]
questionText		[variable type: string, max 100 char]
possibleAnswers 	[variable type: string, if "NULL"-->open text box response]
followUpBy 		[variable type: array-double {enum}, the index of questions that this question is a followed up by]
similarTo		[variable type: array-double {enum}, the index of questions that is similart to the current question, meaning the answer to the question might be the same}
relevancy 		[variable type: double {1-100}, the current relevancy rating of the question]
specificity		[variable type: double {1-10}, how specific/pointed is the question, after this question is answered, how narrow is the possible list of recommendations]


Response-type 		[variable type: string, {options}]
intent			[variable type: string, {options}]
questionType		[variable type: string, {options}, the kind of question (Factual, Evaluation, Convergent, Divergent)]

Methods:





