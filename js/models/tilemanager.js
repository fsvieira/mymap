function TileManager(alpha){
	Model.call(this); 
	this.mkField({'label': 'name', 'value':"New Tile Manager",}); 
	this.mkField({'label': 'tile_w', 'value':64, }); 
	this.mkField({'label': 'tile_h', 'value':64, }); 
	this.mkField({'label': 'image', 'value':null, }); 
	this.mkField({'label': 'alpha', 'value':alpha, }); 
	
	this.mkField({'label': 'tiles', 'value': {} }); 
	
	
	this.getName = function(){
		if(this.alpha.get()){
			return 'alpha - ' + this.name.get(); 
		}	
		return this.name.get(); 
	}; 
	
	this.getTile = function(c, l){
		var tile = this.tiles.getTupleDict(c, l); 
		if(tile){
			return tile; 
		} 
		
		tile = new Tile(c, l); 
		this.tiles.addTupleDict(c, l, tile); 
		return tile; 
		
	}; 
}; 
