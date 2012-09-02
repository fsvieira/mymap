function TileManager(alpha){
	Model.call(this); 
	this.mkField({'label': 'name', 'value':"New Tile Manager",}); 
	this.mkField({'label': 'tile_w', 'value':64, }); 
	this.mkField({'label': 'tile_h', 'value':64, }); 
	this.mkField({'label': 'image', 'value':null, }); 
	this.mkField({'label': 'alpha', 'value':alpha, }); 
	
	// TODO: manage tiles? 
	
	this.getName = function(){
		if(this.alpha.get()){
			return 'alpha - ' + this.name.get(); 
		}	
		return this.name.get(); 
	}; 
	
	
}; 
