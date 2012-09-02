function Tile(alpha, image){
	Move.call(this); 
	this.mkField({'label': 'alpha', 'value':alpha}); 
	this.mkField({'label': 'image', 'value':image}); 
	this.mkField({'label': 'frames', 'value':1}); 
	this.mkField({'label': 'repeat', 'value':1}); 
}; 
