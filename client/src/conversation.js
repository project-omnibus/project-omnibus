$( document ).ready(function() {
	var userSession = {};

	// SUBMIT FORM
	$("#start_button").click(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		$("#start_button").hide();
		makeInitUser();
	});
	$("#answerForm").submit(function(event){
		event.preventDefault();
		userPost();
	});

    // DO A GET FROM SERVER FOR THE INITIAL USER SESSION OBJECT
    function makeInitUser(){
    	$.ajax({
			type : "GET",
			contentType : "application/json",
			url : window.location + "/makeInitUser", //send the values to server with post. THis is sending it to app.js on server side for routing
			data: {get_param: 'value'},
			dataType: 'json',
			success : function(result) {
				$("#qmain").empty();
				$.each(result,function(i,user){
					userSession = user;
				});
				$("#qmain").append(userSession.currentQ.question + '</br>');
				console.log("Success: ", userSession)
			},
			error : function(e) {
				$("#qmain").html("<strong> Error </strong>");
				console.log("ERROR: ", e);
			}
		});

    }

	// DO A POST TO SERVER OF THE USER's ANSWER TO THE CURRENT QUESTION
	function userPost(){
		//update the userSession object with the answer the user just input
		userSession.answer = $("#answer").val();
		$.ajax({//DO POST
			type : "POST",
			contentType : "application/json",
			url : window.location + "/makeConversation",
			data : JSON.stringify(userSession),
			dataType : "json",
			success: function(result){
				$("#qmain").empty();
				userSession = result;
				$("#qmain").append(userSession.question + '</br>');
				console.log("Success: ", userSession);
			},
			error : function(e) {
				$("#qmain").html("<strong> Error </strong>");
				console.log("ERROR: ", e);
			}
		});
		resetData();
	}

  function resetData(){
    $("#answer").val("");
  }
});
