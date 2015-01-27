var Graph = function(){
  this.nodes = [];
  this.edges = [];
  this.count = 0;
}

Graph.prototype.insert = function(data){
  var node = new Node(data, this.count);
  this.count++;
  this.nodes.push(node);
}

Graph.prototype.connect = function(source, target){
  var edge = new Edge(source, target);
  this.edges.push(edge);
  var sourceNode = this.getNode(source);
  var targetNode = this.getNode(target);
  sourceNode.edgeTo.push(target);
  targetNode.edgeTo.push(source);
}

Graph.prototype.getNode = function(id){
  for(var i = 0, l = this.nodes.length; i < l; i++){
    if(this.nodes[i].id === id){
      return this.nodes[i];
    }
  }
}

Graph.prototype.copyNodeArray = function(){
  return this.nodes.slice();
}

var Node = function(data, id){
  this.id = id;
  this.data = data;
  this.edgeTo = [];
}

var Edge = function(source, target){
  this.source = source;
  this.target = target;
}
