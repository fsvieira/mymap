function UI_Layers(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<ul />'); 
	
	this.layer = null; 
	
	this.update = function(map){
		this.root.html(''); 
		if(map != null){
			var l; 
			var layers = map.layers.get()
			for(l in layers){
				this.root.append($('<li>' + l + ' - ' + layers[l].name +'<li/>'));
			}
			
			this.layer = layers[0]; 
			if(!this.layer){
				this.layer = null; 
			}
		}
	}; 
	
	this.getLayer = function(){
		return this.layer; 
	}
	
}; 
