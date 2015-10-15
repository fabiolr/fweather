// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var currTemp;
var normalTemp = 72; // To be fed by normal data downloaded and parsed for location
var oMessages;
var oWeather;
var oHistory;
var chosenMessage;
var zip;
var d = new Date();

// checks for zip in cookies

  $( document ).ready(function() {
    $( "p" ).text( "The DOM is now loaded and can be manipulated." );
  });
  
zip = document.cookie.replace(/(?:(?:^|.*;\s*)zip\s*\=\s*([^;]*).*$)|^.*$/, "$1");


// Changes ZIP on click of change button, sets cookie and calls to change stuff

$("#ChangeZip").click(function(){

    	zip = $('#zip').val();
 		document.cookie = "zip="+zip;
    	GetWeather();

});

// Gets Funny messages

function LoadMessages() {


$.getJSON("data/funny.json")

	.done(function(data) {
		 oMessages = data;
		 DoMsgLogic();
	});
}

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
  	return aPossibleMessages[gaugeCanvas.int(gaugeCanvas.random(aPossibleMessages.length))];

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
			$("body").css( "background", "red" );  
			
		} else if (currTemp < .9 * normalTemp) {

			// Case 1 - for really fucking cold 
			chosenMessage = PickOneMessage(1);
			console.log("Case1");
			$("body").css( "background", "blue" );  

		} else if (currTemp >= normalTemp) { 

			// Case 3 - for hot as usual
			chosenMessage = PickOneMessage(3);
			console.log("Case3");
			$("body").css( "background", "red" );  

		} else if (currTemp < normalTemp) {

			// Case 2 - for cold as usual
			chosenMessage = PickOneMessage(2);
			console.log("Case2");
			$("body").css( "background", "blue" );  

		}

			$("#bigMsg").html(chosenMessage.bigMsg);
			$("#smallMsg").html(chosenMessage.smallMsg);

	}, 100);

}

/////////////////////////////////
///  ICON   SELECTION   LOGIC ///
/////////////////////////////////



/////////////////////////////////
///  HISTORICAL CONTEXT LOGIC ///
/////////////////////////////////

var  m = d.getMonth() + 1;


function GetHistory() {


$.getJSON("http://api.wunderground.com/api/cb061a9fcab50867/planner_"+m+"01"+m+"30/q/"+zip+".json")

	.done(function(data) {
		 oHistory = data;
		 // example: oHistory.trip.temp_high.max.F 
		 DoGauge();
	});
}

function DoGauge() {

		// contruct gauge based on oHistory data.


}

/////////////////////////////////
///  API CALLS AND HANDLING   ///
/////////////////////////////////

function GetWeather() {


$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&APPID=60f3da918baca596bc5457e165aa3cd3&units=imperial")
	.done(function(data) {
		 oWeather = data;
		 DoWeatherLogic();
		 DoMsgLogic();
		 GetHistory();
	});
}


function DoWeatherLogic() {

	// get temperature and put into context

	// update city name on gui
	$("#CurrentCity").html(oWeather.name);
	currTemp = oWeather.main.temp;
	console.log(oWeather.name);
}


