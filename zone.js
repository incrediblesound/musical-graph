function rnd(max){
  return Math.floor(Math.random()*max+1)
}

var Zone = function(context, options){
  Soul.call(this, options.note);
  this.createdAt = new Date();
  this.context = context;
  this.location = {x: options.x, y: options.y};
  this.movement = {x: rnd(3), y: rnd(3)};
  this.radius = options.r;
  this.cell = new Cell(options.x, options.y);
  this.needsUpdate = true;
  this.oscillator = new Oscillator(2, 'sine', this.note);
}

Zone.prototype = Object.create(Soul.prototype);

Zone.prototype.render = function(myId){
  this.context.beginPath();
  this.context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
  this.context.fillStyle = 'red';
  this.context.fill();
  this.context.lineWidth = 2;
  this.context.strokeStyle = '#003300';
  this.context.stroke();
  var thisNode = scene.graph.getNode(myId);
  for(var i = 0; i < thisNode.edgeTo.length; i++){
    var edge = thisNode.edgeTo[i];
    var target = scene.graph.getNode(edge);
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