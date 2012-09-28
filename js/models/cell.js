function Cell(position){
	Move.call(this); 

	this.position = position; 
	
	this.mkField({'label': 'tile', 'value':null}); 
	this.mkField({'label': 'alpha', 'value':null}); 
	
	this.image = null; 
	this.frames = 0; 
	
	this.setTile = function(tile){
		if(tile.isAlpha()){
			this.alpha.set(tile); 
		}else{
			this.tile.set(tile); 
		}
		this.update();
	};
	
	
	this.getTileWidth = function(){
		if(this.image){
			return this.image[0].width; 
		}
		
		return 0; 
		
	}; 
	
	this.getTileHeight = function(){
		if(this.image){
			return this.image[0].height; 
		}
		
		return 0; 
	}; 
	
	// render image, 
	this.apply_alpha = function(frame){
		var tile_image = this.tile.get().getFrame(frame); 
		if(this.alpha.get() != null){
			alpha_image = this.alpha.get().getFrame(frame); 

			var tile_pix = tile_image;
			var alpha_pix = alpha_image;
		
			// ** apply alpha:
			for(var x=0; x!=tile_image.width; x++){
				for(var y=0; y!=tile_image.width; y++){
					if((x < alpha_image.width) && (y < alpha_image.height) ){
						var tile_offset = (y*tile_image.width+x)*4; 
						var alpha_offset = (y*alpha_image.width+x)*4;
						tile_pix[tile_offset+3] = alpha_pix[alpha_offset]*(alpha_pix[alpha_offset+3]/255); 
					}
				}
			}
		}
		
		this.image.push(tile_pix); 
		
	}; 
	
	this.update = function(){
		if(this.tile.get() != null && this.alpha.get() != null){
			
			var end = false; 
			this.image = []; 
			this.frames = 0; 
			while(!end){
				this.apply_alpha(this.frames); 	
				this.frames++; 
				
				end = (this.tile.get().getFrameNumber(this.frames) == 0) 
				      && ((this.alpha.get() == null) || (this.alpha.get().getFrameNumber(this.frames) == 0));   
				
			}; 
			
		}else if(this.tile.get() != null || this.alpha.get() != null){
			var tile = this.tile.get(); 
			if(tile == null){
				tile = this.alpha.get(); 
			}
			
			this.image = []; 
			this.frames = tile.frames.get(); 
			this.repeat = tile.repeat.get(); 
			
			for(var i=0; i!=this.frames; i++){
				this.image.push(tile.getFrame(i)); 
			}
			
		}
	}; 

	this.getPosition = function(){
		return this.position; 
	}; 
	
	
}; 
