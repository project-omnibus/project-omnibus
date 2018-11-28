$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#customerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		question : $("#question").val(),
    		answer :  $("#answer").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "../conversation", //send the values to server with post. THis is sending it to app.js on server side for routing
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(userSession) {
				$("#postResultDiv").html("<p>" + 
					"Post Successfully! <br>" +
					"--->" + JSON.stringify(userSession)+ "</p>"); 
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#question").val("");
    	$("#answer").val("");
    }
})