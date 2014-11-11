
WIDTH = window.innerWidth-10;
HEIGHT = window.innerHeight-10;

var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

canvas = document.getElementById('frame').appendChild(canvas);

/* 
the init function sets up the data 
the animate function changes the location coordinates every animation frame 
the render function paints it all onto the canvas
*/

function animate_init(){
  scene = {};
  scene.graphs = [];
  scene.graphs.push(new Graph());
  scene.graphs.push(new Graph());
  scene.graphs.push(new Graph());
  scene.context = canvas.getContext('2d');
  populateGraph();
  animate();
}

function animate(){
  scene.context.clearRect(0, 0, WIDTH, HEIGHT);
  scene.graphs.forEach(function(graph){
    move(graph);
    render(graph);
  });
  requestAnimationFrame( animate );
}

function render(graph){
  var nodes = graph.copyNodeArray();
  nodes.forEach(function(node){
    node.data.render(graph, node.id);
  })
}

// this function is called every animation frame to move the nodes
function move(graph){
  var nodes = graph.copyNodeArray();
  nodes.forEach(function(node){
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

function populateGraph(){
  scene.graphs.forEach(function(graph, i){
    graphData[i].forEach(function(nodeData){
      graph.insert( new Zone(scene.context, nodeData) );
    });
  });
  scene.graphs[0].connect(0, 1);
  scene.graphs[0].connect(1, 2);
  scene.graphs[0].connect(1, 3);
  scene.graphs[0].connect(3, 4);
  scene.graphs[0].connect(5, 6);
  scene.graphs[0].connect(0, 6);
  scene.graphs[1].connect(0, 1);
  scene.graphs[1].connect(0, 2);
  scene.graphs[1].connect(0, 3);
  scene.graphs[1].connect(2, 4);
  scene.graphs[1].connect(3, 5);
  scene.graphs[2].connect(0, 1);
  scene.graphs[2].connect(0, 2);
  scene.graphs[2].connect(2, 3);
  scene.graphs[2].connect(2, 4);
}
