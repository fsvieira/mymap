function Tile(father, column, line){
	Move.call(this, {'father': father}); 
	this.mkField({'label': 'column', 'value': column});  
	this.mkField({'label': 'line', 'value': line});  

	this.mkField({'label': 'frames', 'value':1}); 
	this.mkField({'label': 'repeat', 'value':1}); 
	
	this.isAlpha = function(){
		return this.father.isAlpha(); 
	}; 
	
	
	this.getWidth = function(){
		return this.father.tile_w.get();
	};  
	
	this.getHeight = function(){
		return this.father.tile_h.get();
	}; 
	
	this.getFrame = function(frame){
		frame = Math.ceil((frame % this.frames.get()*this.repeat.get())/this.repeat.get()); 
		var newCanvas = document.createElement('canvas');
		var new_ctx = newCanvas.getContext('2d');  
		newCanvas.width = this.getWidth(); 
		newCanvas.height = this.getHeight(); 
		new_ctx.drawImage(
				this.father.getImage(),
				(frame+this.column.get())*this.getWidth(),
				this.line.get()*this.getHeight(), 
				this.getWidth(), 
				this.getHeight(),
				0,0,
				this.getWidth(), 
				this.getHeight()
		);  

		return new_ctx.getImageData(
					0, 0, 
					this.getWidth(), 
					this.getHeight()
				);

	};
	
	
	this.getFrameNumber = function(frame){
		return Math.ceil(frame % this.frames.get()*this.repeat.get()); 
	}; 
	
}; 
