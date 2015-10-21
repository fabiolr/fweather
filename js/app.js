// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var currTemp;
var normalTemp = 72; // To be fed by normal data downloaded and parsed for location
var historicalLowMin;
var historicalLowAvg;
var historicalLowMax;
var historicalHighMin;
var historicalHighAvg;
var historicalHighMax;
var withinAvg = .02; // percentage within average to be considered average
var oMessages; // object with funny messages
var oWeather;  // objects with current weather
var oHistory;  // object with historical weather
var chosenMessage;  // 
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


		// if temp is extreme, we can call a message regardless of time of day

		if (currTemp >= historicalHighMax) {  

			// Case 5 - for really fucking hot
			chosenMessage = PickOneMessage(5);
			console.log("Temp Case5");
			bgcolor = "red";

		} else if (currTemp <= historicalLowMin) {

			// Case 1 - for really fucking cold 
			chosenMessage = PickOneMessage(1);
			console.log("Temp Case1");
			bgcolor = "blue";

			}

			// Ok, maybe the temp is not extreme, so let's figure out what to make of it based on the time of day...
			

		 else if (d.getHours() > 10 && d.getHours < 18) {		// Run this during High Temp Hours of day

		 	console.log("At this time of the day I'll use HIGH hostorical temps to do decide the message");

			if (currTemp >= (historicalHighAvg * (1 - withinAvg)) && currTemp <= (historicalHighAvg * (1 + withinAvg))) {

						// Case 8 - Within High Average 
					chosenMessage = PickOneMessage(8);
					console.log("Temp Case 8 Within High Average");
					bgcolor = "grey";

			} else if (currTemp <= historicalHighMin) {

				// Case  6 - Cold for this time of day
					chosenMessage = PickOneMessage(6);
					console.log("Case  6 - Cold for this time of day");
					bgcolor = "cyan";

			} else if (currTemp >= historicalHighMin && currTemp < historicalHighAvg) {

				// Case  7 - Confortable for here
					chosenMessage = PickOneMessage(7);
					console.log("Case  7 - Ok for here");
					bgcolor = "lavender";

			} else if (currTemp >= historicalHighAvg && currTemp < historicalHighMax) {

				// Case  9 - It is very hot
					chosenMessage = PickOneMessage(9);
					console.log("Case  9 - It is very hot");
					bgcolor = "peru";

			}


		} else  {		// Run this during the rest of the day

		 	console.log("At this time of the day I'll use LOW hostorical temps to do decide the message");


			if (currTemp >= (historicalLowAvg * (1 - withinAvg)) && currTemp <= (historicalLowAvg * (1 + withinAvg))) {

						// Case 3 - Within Low Average 
					chosenMessage = PickOneMessage(3);
					console.log("Case 3 - Within Low Average");
					bgcolor = "moccasin";
		}


			else if (currTemp >= historicalLowAvg && currTemp < historicalLowMax) {

				// Case 4 Its kinda chilly
					chosenMessage = PickOneMessage(4);
					console.log("Case  4 - 	Its kinda chilly");
					bgcolor = "lavender";

			}


			else if (currTemp >= historicalLowMin && currTemp < historicalLowAvg) {

				// Case 2 Its cold!
					chosenMessage = PickOneMessage(2);
					console.log("Case 2 Its cold");
					bgcolor = "blue";

			}

			else if (currTemp >= historicalLowMax) {

				// Case  5 Its actually hot for this time of the day
					chosenMessage = PickOneMessage(5);
					console.log("Case  5 Its actually hot for this time of the day");
					bgcolor = "red";

			}

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
		oHistory = data;
		console.log("just got hisotrical data for " + oHistory.trip.airport_code + " for " + oHistory.trip.title);

		historicalLowMin = oHistory.trip.temp_low.min.F;
		historicalLowAvg = oHistory.trip.temp_low.avg.F;
		historicalLowMax = oHistory.trip.temp_low.max.F;
		historicalHighMin = oHistory.trip.temp_high.min.F;
		historicalHighAvg = oHistory.trip.temp_high.avg.F;
		historicalHighMax = oHistory.trip.temp_high.max.F;

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

		$("body").fadeIn(1200	);


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


	


