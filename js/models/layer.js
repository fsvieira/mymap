function Layer(args){
	Model.call(this, args); 
	this.mkField({'label': 'name','value':"New Layer"}); 
	this.mkField({'label': 'cells','value': {} }); 

	this.update_grid = function(grid){
		// alert("TODO update grid"); 
	}.bind(this); 

	this.father.grid.event('change', this.update_grid); 
	
	this.free = function(){
		this.father.grid.remove_event('change', this.update_grid); 
	}; 
	
	this.addTile = function(c, l, tile){
		var cell = this.cells.getTupleDict(c,l); 
		if(!cell){
			var grid = this.father.grid.get(); 
			var pos; 
			if(grid){
				pos = grid.getPosition(c, l); 
			}else{
				pos = {'x': 10, 'y': 10, 'z':0}; 
			}
			
			cell = new Cell(pos);
			this.cells.addTupleDict(c,l, cell);  
		}
		
		cell.setTile(tile); 
	}; 
	
	this.getCell = function(c, l){
		return cell = this.cells.getTupleDict(c,l); 
	}; 
	
}; 
