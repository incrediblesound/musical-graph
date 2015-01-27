var Tree = function(value){
	this.value = value;
	this.children = [];
};

Tree.prototype.insert = function(value){
	this.children.push(new Tree(value));
};

var breadthFirst = function(root){
	console.log(root.value);
	print(root.children);

	function print(thisLevel){
		var nextLevel = [];
		for(var i = 0; i < thisLevel.length; i++){
			var child = thisLevel[i];
			console.log(child.value);
			nextLevel = nextLevel.concat(child.children);
		}
		return nextLevel.length ? print(nextLevel) : undefined;
	}
};