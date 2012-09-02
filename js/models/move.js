function Move(){
	Model.call(this); 
	this.mkField({'label': 'move', 'value':false}); 
	this.mkField({'label': 'up', 'value':false}); 
	this.mkField({'label': 'down', 'value':false}); 
	this.mkField({'label': 'left', 'value':false}); 
	this.mkField({'label': 'right', 'value':false}); 
	this.mkField({'label': 'up_left', 'value':false}); 
	this.mkField({'label': 'up_right', 'value':false}); 
	this.mkField({'label': 'down_left', 'value':false}); 
	this.mkField({'label': 'down_right', 'value':false}); 
}; 
