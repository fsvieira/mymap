function Project(){
	Model.call(this, {}); 
	this.mkField({'label': 'version', 'value':0 });
	this.mkField({'label': 'name', 'value':"New Project"});
	this.mkField({'label': 'grids', 'value':[],});
	this.mkField({'label': 'maps', 'value':[],});   
	this.mkField({'label': 'tileManagers', 'value':[],});  
	
	this.grids.event('remove', function(e){
		for(i in this.maps.get()){
			this.maps[i].update_grid(this.grids); 
		}
	}.bind(this)); 
	
}; 
