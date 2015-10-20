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
var bgcolor;
var goodToGo = 0;

// load [hopefully] funny messages
LoadMessages();


// checks for zip in cookies

zip = document.cookie.replace(/(?:(?:^|.*;\s*)zip\s*\=\s*([^;]*).*$)|^.*$/, "$1");

if (zip) {

	GetWeather();
	GetHistory();

} else {

	// hide everything and request zip

}
 	
  $( document ).ready(function() {

  		// do here whatever u want to the dom

 		console.log("In case you are interested, the DOM is now ready")


  });



// Changes ZIP on click of change button, sets cookie and calls to change stuff

$("#ChangeZip").click(function(){

    	zip = $('#zip').val();
 		document.cookie = "zip="+zip;
 		ClearDom();
		$('#myModal').foundation('reveal', 'close');
    	GetWeather();
		GetHistory();

});

// Gets Funny messages

function LoadMessages() {


$.getJSON("data/funny.json")

	.done(function(data) {
		 oMessages = data;

	});
}


//////////////////////////////////////////////////////////////////
/////////// MESSAGE SELECTION LOGIC  /////////////////////////////
//////////////////////////////////////////////////////////////////

// SELECT only messages with the desired case ID and return an awaaay with all.
// REQUIRED for PickOneMessgae

  function getMessages(id, aFrom) {
    return aFrom.filter(function(obj) {
      if(obj.caseID == id) {
        return obj
        console.log("Oh, getMessages just ran");
      }
    })
  }

// SELECT only one random message from the getMessages functions... todo: incorporate into same fcn
// REQUIRED for DoMsgLogic

  function PickOneMessage(id) {

  	aPossibleMessages = getMessages(id,oMessages);
  	return aPossibleMessages[Math.floor((Math.random() * aPossibleMessages.length))];
        console.log("Oh, PickOneMessage just ran");

  }

// CHOSES and PRINTES messages

function DoMsgLogic() {

		if (currTemp >= (1.1 * normalTemp)) {  

			// Case 5 - for really fucking hot
			chosenMessage = PickOneMessage(5);
			console.log("Temp Case5");
			bgcolor = "red";

		} else if (currTemp < .9 * normalTemp) {

			// Case 1 - for really fucking cold 
			chosenMessage = PickOneMessage(1);
			console.log("Temp Case1");
			bgcolor = "blue";

		} else if (currTemp >= normalTemp) { 

			// Case 3 - for hot as usual
			chosenMessage = PickOneMessage(3);
			console.log("Temp Case3");
			bgcolor = "red";

		} else if (currTemp < normalTemp) {

			// Case 2 - for cold as usual
			chosenMessage = PickOneMessage(2);
			console.log("Temp Case2");
			bgcolor = "blue";

		}

console.log("Oh, DoMsgLogic just ran");

}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

/////////////////////////////////
///  ICON   SELECTION   LOGIC ///
/////////////////////////////////






/////////////////////////////////////////////////
///  HISTORICAL DATA API CALLS AND HANDLING   ///
/////////////////////////////////////////////////

var  m = d.getMonth() + 1;


function GetHistory() {

		console.log("trying to get hisotrical data")

$.getJSON("http://api.wunderground.com/api/cb061a9fcab50867/planner_"+m+"01"+m+"30/q/"+zip+".json")

	.done(function(data) {
		console.log("just got hisotrical data")
		oHistory = data;
		if (goodToGo) {LetsGo()} else {goodToGo = true};

		 // example: oHistory.trip.temp_high.max.F 

	 })

	.fail(function(){
			console.log("fucking error trying to get historical data");

	})
	
	console.log("Oh, GetHistory just ran");
}


/////////////////////////////////////////
///  WEATHER API CALLS AND HANDLING   ///
////////////////////////////////////////

function GetWeather() {

		console.log("going out to get weather data for "+zip)

$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&APPID=60f3da918baca596bc5457e165aa3cd3&units=imperial")
	.done(function(data) {
		console.log("just got current weather data")
		 oWeather = data;
		if (goodToGo) {LetsGo()} else {goodToGo = true};

	});
	console.log("Oh, GetWeather just ran");
}

function FillDom() {

		$("body").animate({backgroundColor: bgcolor}, 1200);

		$("body").fadeIn(1200);


		$("#CurrentCity").html(oWeather.name);
		// $("body").css( "background", bgcolor );
		$("#bigMsg").html(chosenMessage.bigMsg);
		$("#smallMsg").html(chosenMessage.smallMsg);


		console.log("Oh, FillDom just ran");

}

function ClearDom() {

		 $("canvas").fadeOut(500);
		 $("body").fadeOut(500);

		// $("#GaugeCanvas").remove;
		// $("#ConditionCanvas").remove;

		console.log("Oh, ClearDom just ran");
}
function PutInContext() {

	// get temperature and put into context

	// update city name on gui
	currTemp = oWeather.main.temp;
	console.log("The City OpenWeather got for this ZIP is " + oWeather.name + " - Yeah, I know, kinda weird..");

	console.log("Oh, PutInContext just ran");
}

function DoAnimation() {



	console.log("Oh, DoAnimation just ran");
 }

function LetsGo() {

	goodToGo = 0;
	PutInContext();
	DoMsgLogic();
	FillDom();
	DoCanvases();
	DoAnimation();

	console.log("Oh, LetsGo just ran");

}


	


