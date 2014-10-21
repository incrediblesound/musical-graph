var Cell = function(x, y){
  var height = 10;
  var width = 10;
  this.row = Math.floor(y/height);
  this.col = Math.floor(x/width);
}

Cell.prototype.isEqualTo = function(cell){
  return (this.row === cell.row && this.col === cell.col);
}