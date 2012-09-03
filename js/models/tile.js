function Tile(column, line){
	Move.call(this); 
	this.mkField({'label': 'column', 'value': column});  
	this.mkField({'label': 'line', 'value': line});  

	this.mkField({'label': 'frames', 'value':1}); 
	this.mkField({'label': 'repeat', 'value':1}); 
}; 
