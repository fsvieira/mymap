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

		var xi = (frame+this.column.get())*this.getWidth(); 
		var yi = this.line.get()*this.getHeight();

		var imgd = this.father.getImage(); 
		newCanvas.width = imgd.width; 
		newCanvas.height = imgd.height; 

		new_ctx.putImageData(imgd, 0, 0);
			
		imgd = new_ctx.getImageData(xi, yi, this.getWidth(), this.getHeight()); 
		return imgd; 
		

	};
	
	
	this.getFrameNumber = function(frame){
		return Math.ceil(frame % this.frames.get()*this.repeat.get()); 
	}; 
	
}; 
