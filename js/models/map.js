function Map(args){
	Model.call(this, args); 
	this.project = args.project; 
	
	this.mkField({'label': 'name','value': "New Map", });
	
	// TODO: mk grid a indexed field.
	this.mkField({'label': 'grid','value': null,});
	this.mkField({'label': 'unit_layer','value':0,}); 
	this.mkField({'label': 'layers','value':[],});	
	
	// Update all layers if grid change.
	/*this.update_layers = function(){
		for(i in this.layers.get()){
			this.layers.get_item(i).update_grid(this.grid); 	
		}
	};*/ 
	
	// this.grid.event('change', this.update_layers.bind(this)); 

	
	// update grid if grid is removed from list
	this.update_grid = function(grids){
		if(this.grids.indexOf(this.grid) == -1){
			this.grid.set(null); 
		}
	}; 

	this.getName = function(){
		return this.name.get(); 
	}; 
	
	this.addLayer = function(){
		var layer = new Layer({'father': this,}); 	
		this.layers.add(layer);  
		return layer; 
	}; 
	
	var background = this.addLayer(); 
	background.name = "Background"; 

}; 
