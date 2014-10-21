function rnd(max){
  return Math.floor(Math.random()*max+1)
}

var Zone = function(context, options){
  Soul.call(this, options.note);
  this.createdAt = new Date();
  this.context = context;
  this.location = {x: options.x, y: options.x};
  this.movement = {x: rnd(3), y: rnd(3)};
  this.radius = options.r;
  this.cell = new Cell(options.x, options.y);
  this.needsUpdate = true;
  this.oscillator = new Oscillator(2, 'sine', this.note);
}

Zone.prototype = Object.create(Soul.prototype);

Zone.prototype.render = function(){
  // this.context.beginPath();
  this.context.fillRect(this.location.x, this.location.y, this.radius, 10);
  this.context.fillStyle = 'red';
  // this.context.fill();
  // this.context.lineWidth = 2;
  // this.context.strokeStyle = '#003300';
  // this.context.stroke();
  this.needsUpdate = false;
}

Zone.prototype.sing = function(){
  this.oscillator.play(this.note, 1);
}

Zone.prototype.move = function(){
  var nodes = scene.graph.copyNodeArray();
  var self = this;
  nodes.map(function(node){
    if(!(node.data.createdAt === this.createdAt)){
      var diffX = self.location.x - node.data.location.x;
      var diffY = self.location.y - node.data.location.y;
      if(diffY > -5 && diffY < 0 && self.movement.y > 0){
        self.movement.y *= -1;
        return;
      }
      if(diffY < 5 && diffY > 0 && self.movement.y < 0){
        self.movement.y *= -1;
        return;
      }
      if(diffX > -5 && diffX < 0 && self.movement.x > 0){
        self.movement.x *= -1;
        return;
      }
      if(diffX < 5 && diffX > 0 && self.movement.x < 0){
        self.movement.x *= -1;
        return;
      }
    }
  })
  if(this.location.x > 630 || (this.location.x < 10 && this.movement.x < 0)){
    this.movement.x *= -1;
    this.sing();
  }
  if(this.location.y > 475 || (this.location.y < 10 && this.movement.y < 0)){
    this.movement.y *= -1
    this.sing();
  }
  this.location.x += this.movement.x;
  this.location.y += this.movement.y;
}