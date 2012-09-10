function Layer(args){
	Model.call(this, args); 
	this.mkField({'label': 'name','value':"New Layer"}); 
	this.mkField({'label': 'cells','value': {} }); 

	this.update_grid = function(grid){
		// alert("TODO update grid"); 
	}; 
	
	this.addTile = function(c, l, tile){
		var cell = this.cells.getTupleDict(c,l); 
		if(!cell){
			cell = new Cell();
			this.cells.addTupleDict(c,l, cell);  
		}
		
		cell.addTile(tile); 
	}; 
	
}; 
