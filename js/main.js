$(document).ready(function(){
	var DEFINE_INPUT_FILE_NAME = "./res/data.txt";
	var DEFINE_DELIMETER = "/";

	var questionList = [];
	var totalCount = 0;
	var currentIndex = 0;

	$("#input_korean:text").val("");
	$("#input_english:text").val("");

	$("#button_check").hide();
	$("#button_pass").hide();

	function checkMatched(savedString, typedString) {
		if (savedString == typedString) {
			return true;
		} 
		return false;
	}

	function updateQuestion() {
	    if ( currentIndex == totalCount ) {
			currentIndex = 0;
		}

		$("#div_index_info").html((currentIndex+1) + " / " + totalCount);
		$("#input_korean:text").val(questionList[currentIndex].korean);
	    $("#input_hidden_english:text").val(questionList[currentIndex].english);

	    currentIndex++;
	}

    function parsingContents() {
    	var contents = $("#div_hidden_full_contents").text()

        var lines = contents.split("\n");

		for (var i = 0; i < lines.length; i++) {
			var innerLine = lines[i].split(DEFINE_DELIMETER);
			var question = { "korean" : innerLine[0], "english" : innerLine[1] };
			questionList.push (question);
		}

		return lines.length;
    }

    $("#div_hidden_full_contents").load(DEFINE_INPUT_FILE_NAME);
    
    $("#button_start").click(function(){

    	if($("#button_start").text() == "Start!") {
    		totalCount = parsingContents();
    		$("#button_start").hide();
    		$("#button_check").show();
    		$("#button_pass").show();
    		updateQuestion();
    	}
   	
    });

    $("#button_check").click(function(){
    	if (checkMatched($("#input_hidden_english").val(), $("#input_english").val())) {
    		alert("Matched!");
    		updateQuestion();
    		$("#input_english:text").val("");
    	} else {
    		alert("Wrong!");
    	}   	
    });

    $("#button_pass").click(function(){
    	alert($("#input_hidden_english").val());
   		updateQuestion();
    });

});	