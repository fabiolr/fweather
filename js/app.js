// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var currTemp = 80 // To be fed by API
var normalTemp = 82; // To be fed by normal data downloaded and parsed for location
var oMessages;
var chosenMessage;

 jQuery.getJSON("data/funny.json", function(data) {
	oMessages = data;
},DoMsgLogic());

 // get_my_obj = getById(1, oMessages);


  function getMessages(id, aFrom) {
    return aFrom.filter(function(obj) {
      if(obj.caseID == id) {
        return obj
      }
    })
  }

  function PickOneMessage(id) {

  	aPossibleMessages = getMessages(id,oMessages);
  	return aPossibleMessages[int(random(aPossibleMessages.length))];

  }

///////////////////////////////////////////////////////
///  LOGIC TO DECIDE WHAT TO SAY ABOUT CURRENT TEMP ///
///////////////////////////////////////////////////////


function DoMsgLogic() {

	setTimeout(function(){


		if (currTemp >= (1.1 * normalTemp)) {  

			// Case 5 - for really fucking hot
			chosenMessage = PickOneMessage(5);
			console.log("Case5");
			
		} else if (currTemp < .9 * normalTemp) {

			// Case 1 - for really fucking cold 
			chosenMessage = PickOneMessage(1);
			console.log("Case1");

		} else if (currTemp >= normalTemp) { 

			// Case 3 - for hot as usual
			chosenMessage = PickOneMessage(3);
			console.log("Case3");

		} else if (currTemp < normalTemp) {

			// Case 2 - for cold as usual
			chosenMessage = PickOneMessage(2);
			console.log("Case2");

		}

			$("#bigMsg").html(chosenMessage.bigMsg);
			$("#smallMsg").html(chosenMessage.smallMsg);

	}, 50);

}

///////////////////////////////////////////////////////








