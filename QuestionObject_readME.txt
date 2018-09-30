Question Class

Attribute:
index 			[variable type: double, {enum} this is the index of the question in the database]
Text 			[variable type: string, max 100 char]
Response-type 		[variable type: string, {options}]
Possible-reponses 	[variable type: string, if "NULL"-->open text box response]
FollowUpBy 		[variable type: array-double {enum}, the index of questions that this question is a followed up by]
Relevancy 		[variable type: double {1-100}, the current relevancy rating of the question]
Intent			[variable type: string, {options}]


Methods:





