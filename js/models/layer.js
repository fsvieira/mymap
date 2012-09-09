function Layer(args){
	Model.call(this, args); 
	this.mkField({'label': 'name','value':"New Layer"}); 
	this.mkField({'label': 'cells','value': {} }); 

	this.update_grid = function(grid){
		alert("TODO update grid"); 
	}; 
}; 
