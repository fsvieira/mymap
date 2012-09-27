function TileManager(alpha){
	Model.call(this); 
	this.mkField({'label': 'name', 'value':"New Tile Manager",}); 
	this.mkField({'label': 'tile_w', 'value':64, }); 
	this.mkField({'label': 'tile_h', 'value':64, }); 
	this.mkField({'label': 'image', 'value':null, }); 
	this.mkField({'label': 'alpha', 'value':alpha, }); 
	
	this.mkField({'label': 'tiles', 'value': {} }); 
	
	this.image_cache = new Image(); 
	this.image_cache.onload = function(){
		this.trigger_event(new Event(['ready'], {'model': this})); 
	}.bind(this); 

	// TODO: Pass image load to here. 
	this.image.event('change', 
		function(){
			if(this.image.get()){
				this.image_cache.src = 'images/'+ this.image.get(); 
			}else{
				this.image_cache.src = ''; 
			}
			
		}.bind(this)
	); 

		
	this.getImage = function(){
		return this.image_cache; 
	}; 	
		
	this.isAlpha = function(){
		return this.alpha.get(); 
	}; 	
		
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
		
		tile = new Tile(this, c, l); 
		this.tiles.addTupleDict(c, l, tile); 
		return tile; 
		
	}; 
	
	
}; 
