$( document ).ready(function() {
	
	// GET REQUEST
	$("#allAttribute").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : window.location + "/getQuestion",
			success: function(result){
				$('#getResultDiv ul').empty();
				var attributeList = "";
				$.each(result, function(i, user){
					$('#getResultDiv .list-group').append(user.attribute+ "<br>")
				});
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})