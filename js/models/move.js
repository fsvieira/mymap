function Move(args){
	Model.call(this, args); 
	this.mkField({'label': 'move', 'value':false}); 
	this.mkField({'label': 'up', 'value':false}); 
	this.mkField({'label': 'down', 'value':false}); 
	this.mkField({'label': 'left', 'value':false}); 
	this.mkField({'label': 'right', 'value':false}); 
	this.mkField({'label': 'up_left', 'value':false}); 
	this.mkField({'label': 'up_right', 'value':false}); 
	this.mkField({'label': 'down_left', 'value':false}); 
	this.mkField({'label': 'down_right', 'value':false}); 
	
	this.move.event('change', function(){
		if(this.move.get()){
			this.up.set(true); 
			this.down.set(true);
			this.left.set(true);
			this.right.set(true);
			this.up_left.set(true);
			this.up_right.set(true);
			this.down_left.set(true);
			this.down_right.set(true);
		}else{
			this.up.set(false); 
			this.down.set(false);
			this.left.set(false);
			this.right.set(false);
			this.up_left.set(false);
			this.up_right.set(false);
			this.down_left.set(false);
			this.down_right.set(false);
		}
	}.bind(this)); 
	
	
}; 
