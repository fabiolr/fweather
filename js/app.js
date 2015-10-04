// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var currTemp = 82	 // To be fed by API
var normalTemp = 82; // To be fed by normal data downloaded and parsed for location
var oMessages;
var chosenMessage;
var zip;

// Chamges ZIP on click of change button

$("#ChangeZip").click(function(){

    	zip = $('#zip').val();
    	ZipChanged();

});

 jQuery.getJSON("data/funny.json", function(data) {
	oMessages = data;
},DoMsgLogic());

// This function will select only messages with the desired case ID and return an awaaay with all.

  function getMessages(id, aFrom) {
    return aFrom.filter(function(obj) {
      if(obj.caseID == id) {
        return obj
      }
    })
  }

// This function will select only one random message from the getMessages functions... todo: incorporate into same fcn

  function PickOneMessage(id) {

  	aPossibleMessages = getMessages(id,oMessages);
  	return aPossibleMessages[int(random(aPossibleMessages.length))];

  }

// function to be called when user changes/selectsa a zip. reloads everything 

function ZipChanged() {

	// Call the API to get new Data for new Zip.

	// Load the new data into the variables
	
	// do the message logic again

	DoMsgLogic();

}


/////////////////////////////////
///  MESSAGE SELECTION  LOGIC ///
/////////////////////////////////

function DoMsgLogic() {

	setTimeout(function(){

		if (currTemp >= (1.1 * normalTemp)) {  

			// Case 5 - for really fucking hot
			chosenMessage = PickOneMessage(5);
			console.log("Case5");
			$(".message-block").css( "background", "red" );  
			
		} else if (currTemp < .9 * normalTemp) {

			// Case 1 - for really fucking cold 
			chosenMessage = PickOneMessage(1);
			console.log("Case1");
			$(".message-block").css( "background", "blue" );  

		} else if (currTemp >= normalTemp) { 

			// Case 3 - for hot as usual
			chosenMessage = PickOneMessage(3);
			console.log("Case3");
			$(".message-block").css( "background", "red" );  

		} else if (currTemp < normalTemp) {

			// Case 2 - for cold as usual
			chosenMessage = PickOneMessage(2);
			console.log("Case2");
			$(".message-block").css( "background", "blue" );  

		}

			$("#bigMsg").html(chosenMessage.bigMsg);
			$("#smallMsg").html(chosenMessage.smallMsg);

	}, 100);

}

/////////////////////////////////
///  ICON   SELECTION   LOGIC ///
/////////////////////////////////






