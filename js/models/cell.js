function Cell(tile){
	Move.call(this); 
	this.mkField({'label': 'tile', 'value':tile}); 
	
	
	this.addTile = function(tile){
		this.tile.set(tile); 
	};
	
}; 
