

var oGauge = function( p ) {

  p.setup = function() {

    var cnv = p.createCanvas(120, 60);
    cnv.parent("gauge");
    cnv.id("GaugeCanvas");
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(10,10,10,10);
  };
};

var oCondition = function( p ) {

  p.setup = function() {

    var cnv = p.createCanvas(120, 60);
    cnv.parent("condition");
    cnv.id("ConditionCanvas");
  };

  p.draw = function() {
    p.background(0);
    p.fill(255,0,0  );
    p.rect(10,10,10,10);
  };
};


var gaugeCanvas = new p5(oGauge);
var conditionCanvas = new p5(oCondition);




// var iconCanvas = new p5(sketch);









