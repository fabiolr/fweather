

/// Controls the Gauge canvas  ///


var oGauge = function( p ) {

  p.setup = function() {

    var cnv = p.createCanvas(120, 60);
    cnv.parent("gauge");
    cnv.id("GaugeCanvas");
  };

  p.draw = function() {
    p.background(bgcolor);
    p.fill(255);
    p.rect(10,10,100,10);
    p.fill(0);
    p.rect(10+currTemp,10,10,10);
  };
};


/// Controls the weather condition canvas  ///


var oCondition = function( p ) {

  p.setup = function() {

    var cnv = p.createCanvas(120, 60);
    cnv.parent("condition");
    cnv.id("ConditionCanvas");
  };

  p.draw = function() {
    p.background(bgcolor);
    p.fill(255);
    p.text(currTemp+"F in "+oWeather.name,10,10);
  };
};


// actually creates them' canvas

function DoCanvases () {

$("canvas").remove();
var gaugeCanvas = new p5(oGauge);
var conditionCanvas = new p5(oCondition);
console.log("Oh, DoCanvases just ran");

}

  




