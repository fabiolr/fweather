

/// Controls the Gauge canvas  ///


var oGauge = function( p ) {

  var img;

  p.setup = function() {

    oBgColor = p.lerpColor(coldColor,hotColor,tempFactor);
        // Decide color of text based on background color to ensure contrast\
    yiq = ((oBgColor.rgba[0]*299)+(oBgColor.rgba[1]*587)+(oBgColor.rgba[2]*114))/1000;
    textColor =  (yiq >= 128) ? 'dark-text' : 'light-text';
    textColorHex =  (yiq >= 128) ? "#262626" : "#b2b2b2";

    img = p.loadImage("img/"+textColor+"/gauge2.svg");
    var cnv = p.createCanvas(120, 60);
    p.image(img, 0, 0);
    cnv.parent("gauge");
    cnv.id("GaugeCanvas");

  };

    var cangle = -120;
    var minangle = (180 * minFactor) - 90;
    var maxangle = (180 * maxFactor) - 90;

  p.draw = function() {

    var angle = (180 * tempFactor);

    p.background(oBgColor);
    p.image(img, 0, 0);
    p.stroke(textColorHex);
    p.translate(60,56);
    p.angleMode(p.DEGREES);
    
    p.push();
        p.stroke(textColorHex);
        p.textSize(7);

        p.rotate(minangle);

        //p.text(p.int(historicalLowAvg),-30,0);
      //  p.text(p.int(historicalLowAvg),-30,0);

        p.line(0,-38,0,-43); 
        p.rotate(maxangle);
        //p.text(p.int(historicalHighAvg),-30,0);

        p.line(0,-38,0,-43); 
    p.pop();
    
    if (cangle < angle) {
        p.rotate(cangle);
        p.stroke(textColorHex);
        p.triangle(-6,1,-6,-1,-40,0)
        cangle = cangle + 1;

      } else {

        p.rotate(angle);
        p.fill(textColorHex);
        p.triangle(-6,1,-6,-1,-40,0);
      }

  };
};


/// Controls the weather condition canvas  ///
// todo: make rain animation

var oCondition = function( p ) {

  p.setup = function() {

    img = p.loadImage("img/"+textColor+"/"+currentWeather);
    var cnv = p.createCanvas(120, 60);
    cnv.parent("condition");
    cnv.id("ConditionCanvas");
  };


  p.draw = function() {
    p.background(oBgColor);
    p.image(img, 0, 0);
    p.fill(textColorHex);
    p.textSize(16);

    p.text(p.int(currTemp)+" F",43,36);

    
  };
};


// actually creates them' canvas

function DoCanvases () {

$("canvas").remove();
var gaugeCanvas = new p5(oGauge);
var conditionCanvas = new p5(oCondition);
console.log("Oh, DoCanvases just ran");

}

  




