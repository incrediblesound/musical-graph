
WIDTH = window.innerWidth-10;
HEIGHT = window.innerHeight-10;

var el = document.createElement('canvas');
el.width = WIDTH;
el.height = HEIGHT;

canvas = document.getElementById('frame').appendChild(el);

var middle = [
	{ r:15, note:0, osc: 'double', octave: 1, shape: 'square', detune: 0.2, color: 'green', speed: 3},
	{ r:15, note:3, osc: 'double', octave: 1, shape: 'square', detune: 0.2, color: 'green', speed: 3},
	{ r:15, note:5, osc: 'double', octave: 1, shape: 'square', detune: 0.2, color: 'green', speed: 3},
	{ r:15, note:7, osc: 'double', octave: 1, shape: 'square', detune: 0.2, color: 'green', speed: 3},
	{ r:15, note:10, osc: 'double', octave: 1, shape: 'square', detune: 0.2, color: 'green', speed: 3}
]

var high = [
	{ r:10, note:2, osc: 'single', octave: 3, shape: 'sine', color: 'blue', speed: 4},
	{ r:10, note:5, osc: 'single', octave: 3, shape: 'sine', color: 'blue', speed: 4},
	{ r:10, note:9, osc: 'single', octave: 3, shape: 'sine', color: 'blue', speed: 4},
	{ r:10, note:10, osc: 'single', octave: 3, shape: 'sine', color: 'blue', speed: 4}
]

var low = [
	{ r:20, note:0, osc: 'double', octave: 0, shape: 'saw', detune: 0.3, color: 'red', speed: 2},
	{ r:20, note:5, osc: 'double', octave: 0, shape: 'saw', detune: 0.3, color: 'red', speed: 2},
	{ r:20, note:7, osc: 'double', octave: 0, shape: 'saw', detune: 0.3, color: 'red', speed: 2},
]

function init(){
	scene = {};
	scene.graphLow = new Graph();
	scene.graphMid = new Graph();
	scene.graphHi = new Graph();
	scene.context = canvas.getContext('2d');
	populateGraph();
}

function animate(){
	scene.context.clearRect(0, 0, WIDTH, HEIGHT)
	move(scene.graphMid);
	move(scene.graphHi);
	move(scene.graphLow);
	render(scene.graphMid);
	render(scene.graphHi);
	render(scene.graphLow);
	requestAnimationFrame( animate );
}

function render(graph){
	var nodes = graph.copyNodeArray();
	nodes.map(function(node){
		node.data.render(graph, node.id);
	})
}

function populateGraph(){
	for(var i = 0; i < middle.length; i++){
		scene.graphMid.insert(new Zone(scene.context, middle[i]));
	}
	scene.graphMid.connect(0, 1);
	scene.graphMid.connect(1, 2);
	scene.graphMid.connect(1, 3);
	scene.graphMid.connect(3, 4);
	for(var i = 0; i < high.length; i++){
		scene.graphHi.insert(new Zone(scene.context, high[i]));
	}
	scene.graphHi.connect(0, 1);
	scene.graphHi.connect(0, 2);
	scene.graphHi.connect(0, 3);
	for(var i = 0; i < low.length; i++){
		scene.graphLow.insert(new Zone(scene.context, low[i]));
	}
	scene.graphLow.connect(0, 1);
	scene.graphLow.connect(1, 2);
}

// this function is called every animation frame to move the nodes

function move(graph){
	var nodes = graph.copyNodeArray();
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