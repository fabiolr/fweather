

/// Controls the Gauge canvas  ///


var oGauge = function( p ) {

  var img;

  p.setup = function() {

    img = p.loadImage("img/gauge2.svg");
    var cnv = p.createCanvas(120, 60);
    p.image(img, 0, 0);
    cnv.parent("gauge");
    cnv.id("GaugeCanvas");
    oBgColor = p.lerpColor(coldColor,hotColor,tempFactor);



  };

    var cangle = -120;
    var minangle = (180 * minFactor) - 90;
    var maxangle = (180 * maxFactor) - 90;

  p.draw = function() {

    var angle = (180 * tempFactor);

    p.background(oBgColor);
    p.image(img, 0, 0);
    p.stroke("#5b5b5b");
    p.translate(60,56);
    p.angleMode(p.DEGREES);
    p.push();
        p.rotate(minangle);
        p.line(0,-38,0,-43); 
        p.rotate(maxangle);
        p.line(0,-38,0,-43); 
    p.pop();
      if (cangle < angle) {
        p.rotate(cangle);
        //p.line(0,-6,0,-40);
        p.fill(oBgColor);
        p.triangle(-6,1,-6,-1,-40,0)
        cangle = cangle + 1;

      } else {

        p.rotate(angle);
        p.fill(oBgColor);
        p.triangle(-6,1,-6,-1,-40,0)
        //p.line(0,-6,0,-40);

      }

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
    p.background(oBgColor);
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

  




