$(document).ready(function(){
	var DEFINE_VOCA_LIST_FILE_NAME = "./res/voca_list.csv"
	var DEFINE_CSV_DELIMETER = ",";
	var DEFINE_VOCA_DIR_PATH = "./res/";

	var currentVocaFileName = "";
	var vocaList = [];
	var questionList = [];
	var totalCount = 0;
	var currentIndex = 0;

    function increaseIndex() {
    	if (currentIndex == totalCount - 1) {
    		currentIndex = 0;
    	} else {
    		currentIndex++;
    	}
    }

    function decreaseIndex() {
    	if (currentIndex <= 0) {
    		currentIndex = totalCount - 1;
    	} else {
    		currentIndex--;
    	}
    }

	function initScreen() {
		$("#div_container_question").hide();
		$("#button_start").hide();
		$("#button_check").hide();
		$("#button_pass").hide();
		$("#button_prev").hide();
		$("#button_next").hide();
		eraseAllInputField();
	}

	function updateScreenAfterVocaLoaded() {
		$("#div_container_question").show();
		$("#button_load_voca_list").hide();
		$("#button_start").show();
	}

	function updateScreenAfterStarted() {
		$("#button_check").show();
		$("#button_pass").show();
		$("#button_prev").show();
		$("#button_next").show();
	}

	function eraseAllInputField() {
		$("#input_korean:text").val("");
		$("#input_english:text").val("");
	}

	function checkMatched(savedString, typedString) {
		if (savedString == typedString) {
			return true;
		} 
		return false;
	}

	function updateQuestion() {
		if ( currentIndex == -1 ) {
			currentIndex = totalCount - 1;
		}

	    if ( currentIndex == totalCount ) {
			currentIndex = 0;
		}

		eraseAllInputField();
		$("#div_index_info").html((currentIndex+1) + " / " + totalCount);
		$("#input_korean:text").val(questionList[currentIndex].korean);
	    $("#input_hidden_english:text").val(questionList[currentIndex].english);
	}

	function loadVocaList() {
		var vocaListText = $("#div_hidden_voca_list").text();
		var lines = vocaListText.split("\n");

		for (var i = 0; i < lines.length; i++) {
			var innerLine = lines[i].split(DEFINE_CSV_DELIMETER);
			var voca = { "description" : innerLine[0], "fileName" : innerLine[1] };
			vocaList.push (voca);
		}

		return lines.length;
	}

    function parsingContents() {
    	var contents = $("#div_hidden_full_contents").text();
        var lines = contents.split("\n");

		for (var i = 0; i < lines.length; i++) {
			var innerLine = lines[i].split(DEFINE_CSV_DELIMETER);
			var question = { "korean" : innerLine[0], "english" : innerLine[1] };
			questionList.push (question);
		}

		return lines.length;
    }

    function addVocaList() {
    	for (var i = 0; i < vocaList.length; i++) {
    		$('#select_voca_list').append($('<option>', { 
		        value: vocaList[i].fileName,
		        text : vocaList[i].description 
		    }));
    	}
    }

    $("#select_voca_list").change(function() {
    	if ($("#select_voca_list").val() != "default") {
    		currentVocaFileName = $("#select_voca_list").val();
    		$("#div_hidden_full_contents").load(DEFINE_VOCA_DIR_PATH + currentVocaFileName, function(responseTxt, statusTxt, xhr){
        		if(statusTxt == "success") {
    				updateScreenAfterVocaLoaded();
        		}
        		if(statusTxt == "error") {
            		alert("Voca loading error! (" + xhr.status + ":" + xhr.statusText + ")");
            		initScreen();
            	}
    		});
    	}
    });

    $("#button_load_voca_list").click(function() {
    	loadVocaList();
    	addVocaList();
    });


    $("#button_start").click(function() {

    	if($("#button_start").text() == "Start!") {
    		totalCount = parsingContents();
    		updateQuestion();
    		updateScreenAfterStarted();
    	}
   	
    });

    $("#button_check").click(function() {
    	if (checkMatched($("#input_hidden_english").val(), $("#input_english").val())) {
    		alert("Matched!");
    		increaseIndex();
    		updateQuestion();
    		$("#input_english:text").val("");
    	} else {
    		alert("Wrong!");
    	}   	
    });

    $("#button_pass").click(function() {
    	alert($("#input_hidden_english").val());
    	increaseIndex();
   		updateQuestion();
    });

    $("#button_prev").click(function() {
    	decreaseIndex();
   		updateQuestion();
    });

    $("#button_next").click(function() {
    	increaseIndex();
   		updateQuestion();
    });


    $("#div_hidden_voca_list").load(DEFINE_VOCA_LIST_FILE_NAME);
    
    initScreen();
});	