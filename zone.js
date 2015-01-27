
var Zone = function(context, options){
  this.note = options.note;
  this.context = context;
  this.color = options.color
  this.radius = options.r;
  this.location = {x: rnd(600), y: rnd(400)};
  this.movement = {x: rnd(options.speed), y: rnd(options.speed)};
  this.oscillator = new Oscillator(options);
}

Zone.prototype.render = function(graph, myId){
  // draw circle //
  this.context.beginPath();
  this.context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.lineWidth = 2;
  this.context.strokeStyle = '#003300';
  this.context.stroke();
  var thisNode = graph.getNode(myId);
  var _this = this;
  // draw edges //
  thisNode.edgeTo.forEach(function(edge){
    var target = graph.getNode(edge);
    _this.context.beginPath();
    _this.context.moveTo(_this.location.x, _this.location.y);
    _this.context.lineTo(target.data.location.x, target.data.location.y);
    _this.context.lineWidth = 2;
    _this.context.strokeStyle = '#003300';
    _this.context.stroke();
  });
}

Zone.prototype.sing = function(){
  this.oscillator.play(this.note, 1);
}

function rnd(max){
  return Math.floor(Math.random()*max+1)
}