
WIDTH = window.innerWidth-10;
HEIGHT = window.innerHeight-10;

var el = document.createElement('canvas');
el.width = WIDTH;
el.height = HEIGHT;

canvas = document.getElementById('frame').appendChild(el);

var creatures = [
	{x:25, y:435, r:10, note:0},
	{x:135, y:355, r:10, note:3},
	{x:225,y:235, r:10, note:5},
	{x:325,y:185, r:10, note:7},
	{x:425, y:35, r:10, note:10},
]

function init(){
	scene = {};
	scene.graph = new Graph();
	scene.context = canvas.getContext('2d');
	populateGraph(scene.graph);
}

function animate(){
	move();
	render();
	requestAnimationFrame( animate );
}

function render(){
	scene.context.clearRect(0, 0, WIDTH, HEIGHT)
	var nodes = scene.graph.copyNodeArray();
	nodes.map(function(node){
		node.data.render(node.id);
	})
}

function populateGraph(graph){
	for(var i = 0; i < creatures.length; i++){
		scene.graph.insert(new Zone(scene.context, creatures[i]));
	}
	scene.graph.connect(0, 1);
	scene.graph.connect(1, 2);
	scene.graph.connect(1, 3);
	scene.graph.connect(3, 4);
}

// this function is called every animation frame to move the nodes

function move(){
	var nodes = scene.graph.copyNodeArray();
	nodes.map(function(node){
		if(node.data.location.x > WIDTH && node.data.movement.x > 0){
			node.data.movement.x *= -1;
			node.data.sing();
		}
		else if(node.data.location.x < 5 && node.data.movement.x < 0){
			node.data.movement.x *= -1;	
			node.data.sing();
		}
		if(node.data.location.y > HEIGHT && node.data.movement.y > 0){
			node.data.movement.y *= -1;
			node.data.sing();
		}
		else if(node.data.location.y < 5 && node.data.movement.y < 0){
			node.data.movement.y *= -1;	
			node.data.sing();
		}
		node.data.location.x += node.data.movement.x
		node.data.location.y += node.data.movement.y
	})
}

// extraneous code for adding a click event

document.addEventListener('click', function(e){
	window.audioEngine.input.gain.value = 0;
})

var getCursorPosition = function(e) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  var cell = new Cell(x, y);
  return cell;
}