// Hello, I will try to give you a perspective on the weather. 
// I mean, based on how it is now and how it has been this month in the last 30 years...
// code by @fabiolr - feel free to copy & credit!

$(document).foundation();
var currTemp;
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
var chosenMessage;  
var zip;
var d = new Date();
var bgcolor;   // string form
var oBgColor; // object form
var goodToGo = 0; 
var currentCase;
var startHigh = 10;  // time of day to start using historical highs in comparisons
var endHigh = 18;  // time to go back to using lows
var  m = d.getMonth() + 1;
var coldColor = "#00A0E9";
var hotColor = "#E60012";
var currentWeather;
var weatherID; // cloud cover and rain info saved here
var textColor;
var textColorHex;
var yiq; // helps determine contrast bg/text 
var ErrorMsg;
var JustTold;

// loads [hopefully] funny messages 
LoadMessages();


// checks for zip in cookies, and do the zip thing
zip = document.cookie.replace(/(?:(?:^|.*;\s*)zip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
DoZipStuff();

function DoZipStuff(BadZip) {

		// test ZIPs number consistency, but API might still not like it
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip); 
	
	if (isValidZip && !BadZip) {
		console.log("I like this ZIP - "+zip)
		GetWeather();
		GetHistory();
	} else {
		console.log("No Valid Zip or Cookie Found");
		ErrorMsg = "Sorry, but I don't like ZIP "+zip;
	
	// let's try to get the user to put another zip
		$('.errormsg').html(ErrorMsg);
		$("body").fadeIn(1200);
		$('#myModal').foundation('reveal', 'open');
	}
}


$( document ).ready(function() {
// sometime I use this to make sure the DOM is ready before trying something funny
console.log("In case you are interested, the DOM is now ready fully loaded")
  });

$("#ChangeZip").click(function(){
// Changes ZIP on click of button, sets cookie and calls the zip magic 
    	zip = $('#zip').val();
    	$('#myModal').foundation('reveal', 'close');
 		ClearDom();
    	DoZipStuff();
 		document.cookie = "zip="+zip;
});

function LoadMessages() {
// Gets Funny messages
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

// CHOOSES and PRINTES messages

function DoMsgLogic() {


		// if temp is extreme, we can call a message regardless of time of day

		if (currTemp >= historicalHighMax) {  

			// Case 5 - for really fucking hot
			currentCase = 5;
			// bgcolor = "red";

		} else if (currTemp <= historicalLowMin) {

			// Case 1 - for really fucking cold 
			currentCase = 1;
			// bgcolor = "blue";

			/////////
			// Ok, maybe the temp is not extreme, so let's figure out what to make of it based on the time of day...
			////////

		 } else if (d.getHours() > startHigh && d.getHours() < endHigh) {		// Run this during High Temp Hours of day

		 	console.log("At this time of the day I'll use HIGH hostorical temps to do decide the message");

			if (currTemp >= (historicalHighAvg * (1 - withinAvg)) && currTemp <= (historicalHighAvg * (1 + withinAvg))) {

					// Case 8 - Within High Average 
					currentCase = 8;
					// bgcolor = "grey";

			} else if (currTemp <= historicalHighMin) {

				// Case  6 - Cold for this time of day
					currentCase = 6;
					// bgcolor = "cyan";

			} else if (currTemp >= historicalHighMin && currTemp < historicalHighAvg) {

				// Case  7 - Confortable for here
					currentCase = 7;
					// bgcolor = "lavender";

			} else if (currTemp >= historicalHighAvg && currTemp < historicalHighMax) {

				// Case  9 - It is very hot
					currentCase = 9;
					// bgcolor = "peru";

			}

		} else  {		// Run this during the rest of the day

		 	console.log("At this time of the day I'll use LOW historical temps to do decide the message");

			if (currTemp >= (historicalLowAvg * (1 - withinAvg)) && currTemp <= (historicalLowAvg * (1 + withinAvg))) {

						// Case 3 - Within Low Average 
					currentCase = 3;
					// bgcolor = "moccasin";
		}

			else if (currTemp >= historicalLowAvg && currTemp < historicalLowMax) {

				// Case 4 Its kinda chilly
					currentCase = 4;
					// bgcolor = "lavender";

			}

			else if (currTemp >= historicalLowMin && currTemp < historicalLowAvg) {

				// Case 2 Its cold!
					currentCase = 2;
					// bgcolor = "blue";

			}

			else if (currTemp >= historicalLowMax) {

				// Case  5 Its actually hot for this time of the day
					currentCase = 5;
					// bgcolor = "red";

			}

		}

chosenMessage = PickOneMessage(currentCase);
console.log("Message selected randomly for case #" + currentCase);

}

/////////////////////////////////
///  ICON   SELECTION   LOGIC ///
/////////////////////////////////

function DoIconLogic() {


	if (weatherID >= 200 && weatherID <= 531) {currentWeather = "rain.svg"}
	if (weatherID >= 600 && weatherID <= 622) {currentWeather = "snow.svg"}
	if (weatherID >= 801 && weatherID <= 804) {currentWeather = "cloud.svg"}
	if (weatherID >= 900) {currentWeather = "warning.svg"}
	if (weatherID == 800) {currentWeather = "sun.svg"}

}

/////////////////////////////////////////////////
///  HISTORICAL DATA API CALLS AND HANDLING   ///
/////////////////////////////////////////////////


function GetHistory() {

		console.log("In the market for some historical data")
		$.getJSON("http://api.wunderground.com/api/cb061a9fcab50867/planner_"+m+"01"+m+"30/q/"+zip+".json")
		
			.done(function(data) {
			oHistory = data;

			if (!oHistory.response.error) {

				console.log("GetHistory: requested data from " + oHistory.trip.airport_code + " for month " + m + " and they replied " + oHistory.trip.title);
				
				historicalLowMin = oHistory.trip.temp_low.min.F;
				historicalLowAvg = oHistory.trip.temp_low.avg.F;
				historicalLowMax = oHistory.trip.temp_low.max.F;
				historicalHighMin = oHistory.trip.temp_high.min.F;
				historicalHighAvg = oHistory.trip.temp_high.avg.F;
				historicalHighMax = oHistory.trip.temp_high.max.F;

				if (goodToGo) {LetsGo()} else {goodToGo = true};  // runs LetsGo only if other APIs have also done their jobs

				}

			else { 

			console.log("Oh no, WU API did not like that ZIP that looked fine")
		 	// apparently the API didn't like that ZIP

				if (JustTold) {JustTold = false} 
		 		else {
		 			DoZipStuff(1);
		 			JustTold = true
		 		}

			}

	 	})

			.fail(function(){
			console.log("fucking error trying to get historical data");

		})
	
}


/////////////////////////////////////////
///  WEATHER API CALLS AND HANDLING   ///
////////////////////////////////////////

function GetWeather() {

		console.log("in the market for current weather data for "+zip)

$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&APPID=60f3da918baca596bc5457e165aa3cd3&units=imperial")
	.done(function(data) {
		console.log("GetWeather: Current weather loaded just fine")
		 oWeather = data;

		 if (oWeather.cod == "404") {

		 	console.log("Oh no, OW API did not like that ZIP that looked fine")

		 	if (JustTold) {JustTold = false} 
		 	else {DoZipStuff(1);
		 		JustTold = true
		 	}

		 } else { 

		if (goodToGo) {LetsGo()} else {goodToGo = true};   // runs LetsGo only if other APIs have also done their jobs

		 }
	});

}


/////////////////////////////////////////
///  DOM MANIPULATION FUNCTIONS      ///
////////////////////////////////////////

function FillDom() {

		bgcolor = "rgb("+oBgColor.rgba[0]+","+oBgColor.rgba[1]+","+oBgColor.rgba[2]+")";			
			
		$("#smallMsg").addClass(textColor);
		$("#CurrentCity").addClass(textColor);

		$("body").fadeIn(1200	);

		$("#locicon" ).attr( "src", "img/"+textColor+"/location.svg" );
		$("#CurrentCity").html(oWeather.name);
		$("body").css( "background", bgcolor );
		$("#bigMsg").html(chosenMessage.bigMsg);
		$("#smallMsg").html(chosenMessage.smallMsg);
		


		console.log("FillDom has... mmm... filled the dom..! ");

}


function ClearDom() {

		 $("canvas").fadeOut(500);
		 $("body").fadeOut(500);

		// $("#GaugeCanvas").remove;
		// $("#ConditionCanvas").remove;

		console.log("ClearDom has done its cleasning job");
}


function PutInContext() {

	// get temperature and put into context

	// update city name on gui
	weatherID = oWeather.weather[0].id;
	currTemp = Math.round(oWeather.main.temp * 10) / 10;
	console.log("PutInContext: The city OpenWeather got for this ZIP is " + oWeather.name + " - Yeah, may be weird..");
	tempRange = historicalHighMax - historicalLowMin;
	tempFactor = (currTemp - historicalLowMin) / tempRange;
	minFactor = (historicalLowAvg - historicalLowMin) / tempRange;
	maxFactor = (historicalHighAvg - historicalLowMin) / tempRange;

}

/// When everything is good, time to do the magic..

function LetsGo() {

	console.log("OK, I got all I need, LetsGo!");
	goodToGo = 0; // resets it for next time...
	PutInContext();
	DoMsgLogic();
	DoIconLogic();
	DoCanvases();
	FillDom();

	console.log("I'm done for now");

}