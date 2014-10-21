canvas = document.getElementById('myCanvas');
var creatures = [
	{x:25, y:35, r:10, note:2},
	{x:35, y:75, r:10, note:4},
	{x:125,y:35, r:10, note:6},
	{x:225,y:85, r:10, note:8},
	{x:25, y:135, r:10, note:7},
]

function init(){
	scene = {};
	scene.graph = new Graph();
	scene.context = canvas.getContext('2d');
	populateGraph(scene.graph);
	drawBorder();
}

function populateGraph(graph){
	setInterval(function(){
		if(creatures.length){
			scene.graph.insert(new Zone(scene.context, creatures.pop()));
		}
	}, 1000)
}

function drawBorder(){
	var context = scene.context;
	context.moveTo(1,1);
	context.lineTo(639,1);
	context.moveTo(1,1);
	context.lineTo(1,479);
	context.moveTo(639,1);
	context.lineTo(639,479);
	context.moveTo(480,1);
	context.lineTo(1,479);
	
	context.strokeStyle = "black";
	context.stroke();
}


function animate(){
	render();
	requestAnimationFrame( animate );
}

function render(){
	scene.context.clearRect(0, 0, 640, 480)
	var nodes = scene.graph.copyNodeArray();
	nodes.map(function(node){
		node.data.move();
		node.data.render();
	})
}

document.addEventListener('click', function(e){
	var cell = getCursorPosition(e);
	var nodes = scene.graph.copyNodeArray();
	nodes.map(function(node){
		if(node.data.cell.isEqualTo(cell)){
			console.log(node)
		}
	})
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