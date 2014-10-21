canvas = document.getElementById('myCanvas');
var creatures = [
	{x:25, y:435, r:10, note:2},
	{x:135, y:355, r:10, note:4},
	{x:225,y:235, r:10, note:6},
	{x:325,y:185, r:10, note:8},
	{x:425, y:35, r:10, note:7},
]

function init(){
	scene = {};
	scene.graph = new Graph();
	scene.context = canvas.getContext('2d');
	populateGraph(scene.graph);
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


function animate(){
	render();
	requestAnimationFrame( animate );
}

function render(){
	scene.context.clearRect(0, 0, 640, 480)
	var nodes = scene.graph.copyNodeArray();
	nodes.map(function(node){
		node.data.render(node.id);
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