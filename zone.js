function rnd(max){
  return Math.floor(Math.random()*max+1)
}

var Zone = function(context, options){
  this.note = options.note;
  this.createdAt = new Date();
  this.context = context;
  this.color = options.color
  this.location = {x: rnd(600), y: rnd(400)};
  this.movement = {x: rnd(options.speed), y: rnd(options.speed)};
  this.radius = options.r;
  this.cell = new Cell(options.x, options.y);
  this.needsUpdate = true;
  if(options.osc = 'single'){
    this.oscillator = oscillatorFactory('single', options.octave, options.shape);
  } 
  else if(options.osc = 'double'){
    this.oscillator = oscillatorFactory('double', options.octave, options.shape, (options.detune || 0));
  }
}

Zone.prototype.render = function(graph, myId){
  this.context.beginPath();
  this.context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.lineWidth = 2;
  this.context.strokeStyle = '#003300';
  this.context.stroke();
  var thisNode = graph.getNode(myId);
  for(var i = 0; i < thisNode.edgeTo.length; i++){
    var edge = thisNode.edgeTo[i];
    var target = graph.getNode(edge);
    this.context.beginPath();
    this.context.moveTo(this.location.x, this.location.y);
    this.context.lineTo(target.data.location.x, target.data.location.y);
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
  }
}

Zone.prototype.sing = function(){
  this.oscillator.play(this.note, 1);
}