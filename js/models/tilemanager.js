function TileManager(alpha){
	Model.call(this); 
	this.mkField({'label': 'name', 'value':"New Tile Manager",}); 
	this.mkField({'label': 'tile_w', 'value':64, }); 
	this.mkField({'label': 'tile_h', 'value':64, }); 
	this.mkField({'label': 'image', 'value':null, }); 
	this.mkField({'label': 'alpha', 'value':alpha, }); 
	
	this.mkField({'label': 'tiles', 'value': {} }); 
	
	this.image_cache = new Image(); 
	this.load_image = function(){
		var canvas_elem = document.createElement("canvas"); 
		var canvas = canvas_elem.getContext("2d"); 
			
		canvas_elem.height = this.image_cache.height; 
		canvas_elem.width = this.image_cache.width; 
		canvas.drawImage(this.image_cache, 0, 0); 
				
		if(this.image_cache.height < this.tile_h.get()){
			this.tile_h.set(this.image_cache.height); 
		}
				
		if(this.image_cache.width < this.tile_w.get()){
			this.tile_w.set(this.image_cache.width); 
		}
			
		var imgd = canvas.getImageData(0, 0, this.image_cache.width, this.image_cache.height); 
		if(this.alpha.get()){
			bw_data(imgd); 
		}
		
		this.imgd = imgd; 			
		this.trigger_event(new Event(['ready'], {'model': this})); 
	}.bind(this); 
	
	
	this.imgd = null; 
	this.image_cache.onload = this.load_image; 
	


	// TODO: Pass image load to here. 
	this.image.event('change', 
		function(){
			this.imgd = null;
			if(this.image.get()){
				this.image_cache.src = 'images/'+ this.image.get(); 
			}else{
				this.image_cache.src = ''; 
			}
			
		}.bind(this)
	); 

		
	this.getImage = function(){
		return this.imgd; 
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
