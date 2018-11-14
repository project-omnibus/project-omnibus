/* This code is a copy of questionmain.py to implement the "findBestResponse"
function in Javascript instead of Python because this function can be run 
on the client side. 

It assumes that getting the list of questions and the array of question object
is already done. This function only pertains to the calculation on relevancy 
attribute of each of the question object in the array, assigning the relevancy
of current question to 0 and finding the question with highest relevancy
*/


exports.assignrelevancy = function(qObject, qObjectList){
	// Function assigns the relevancy of all questions in the question
	//qObject is the question object of the current question that was just asked
	//qObjectList is the complete array of all question objects, including the current one
	//the index of qObjectList and qObject should be the same, starting at 0
	qObjectList[(qObject.index)].relevancy = 0; //set the relevancy of the current question in question array to 0
	var followUpLen = qObject.followUpBy.length; //get the length of the number of folloUpBy question to the current question
	if (followUpLen != 0) { //if length isn't 0, then there is some questions that can follow up to current question, set relevancy of those questions to 100.
		for (i = 0; i<followUpLen; i++) {
			qObjectList[qObject.followUpBy[i]].relevancy=100*(qObject.followUpBy[i].relevancy-9); //"-9" here beacuse the minimum default relevancy is 10 for now
		}
	}
}

exports.findmaxrelevancy = function(qObjectList){
	//Function finds the maximum relevancy, indices of the questions with max relevancy and the entire relevancy list
	//returns a maxrel object
	//qObjectList is the complete array of all question objects
	var relevancylist= new Array(); // insstantiate relevancylist variable
	var maxrelevancyindex= new Array(); //instantiate maxrelevancyindex variable
	var qlen = qObjectList.length; //get the length of the question object list
	for (i = 0; i<qlen; i++){ //iterated through question object list and populates relevancy of each question to relevancylist var
		relevancylist.push(qObjectList[i].relevancy);
	}
	var m=Math.max(relevancylist); //find the value of the max relevancy in the list
	for (i = 0; i<qlen; i++) { //iterate through and populates maxrelevancyindex var with indices of questions with max relevancy
		if (qObjectList[i].relevancy==m){
			maxrelevancyindex.push(i);
		}
	}
	var maxrelList = {index:maxrelevancyindex, value:m, array:relevancylist};
	return maxrelList //this is 
}

exports.findquestion = function(qObjectList,maxrelList){
	//function finds and returns 1 question object to present to user. 
	//qObjectList is the complete array of all question objects
	//maxrelList is an array of the indices of questions with max relevancy. 
	if (maxrelList.length == 1) { //if the maxrelList is just 1 element, there is only 1 question to return
		return qObjectList[maxrelList[0]];
	}
	else { //if the maxrelList is more than 1 element, choose at random which question to present
		listlength = maxrelList.length;
		x = Math.floor(Math.random()*listlength); // returns a number at random between 0 and number of elements in maxrelList-1
		return qObjectList[maxreList[x]];
	}
}

