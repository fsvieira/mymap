function Grid(
	type, 
	columns, 
	lines, 
	cell_width, 
	cell_height 
){
	Model.call(this); 
	this.mkField({'label': 'type', 'value':type }); 
	this.mkField({'label': 'columns', 'value':columns }); 
	this.mkField({'label': 'lines', 'value':lines }); 
	this.mkField({'label': 'cell_width', 'value':cell_width }); 
	this.mkField({'label': 'cell_height', 'value':cell_height }); 


	this.getWidth = function(){
		return this.columns.get()*this.cell_width.get(); 
	}; 

	this.getHeight = function(){
		return this.lines.get()*this.cell_height.get(); 
	}; 
	

	this.getName = function(){
		var r; 
		if(this.type.get() == Grid.ORTHOGNAL){
			r = 'ORTHO'; 
		}else{
			r = 'ISO'; 
		}
		
		r+= '-' + this.columns.get() + 'x' + this.lines.get() + '|' +  this.cell_width.get() + 'x' + this.cell_height.get(); 
		return r; 
	}; 

	this.getPosition = function(c, l){
		return {'x': c*this.getWidth(), 'y': this.getHeight(), 'z': 0}; 
	}; 
	
	
	this.onSelect = function(x, y){
		var selectColumn = 0; 
		var selectLine = 0; 
		
		if(this.type.get() == Grid.ISOMETRIC){
			var wm = this.cell_width.get()/2; 
			var hm = this.cell_height.get()/2; 
			var cx = Math.floor(x/wm); 	
			var cy = Math.floor(y/hm);
			
			var m=hm/wm; 
			
			var yh=0; 
			if((cx%2) == (cy%2)){
				m = -m; 
				yh = hm; 
			}
			
			var my = (x-cx*wm)*m+yh;
			var s; 
			
			if((y-cy*hm) < my){
				if(cx%2){
					if(cy%2){
						selectColumn = Math.floor(cx/2); 
						selectLine = cy; 
					}else{
						selectColumn = Math.floor(cx/2)+1; 
						selectLine = cy; 
					}
				}else{
					if(cy%2){
						selectColumn = Math.floor(cx/2); 
						selectLine = cy; 
					}else{
						selectColumn = Math.floor(cx/2); 
						selectLine = cy; 
					}
				}
			}else{
				if(cx%2){
					if(cy%2){
						selectColumn = Math.floor(cx/2)+1; 
						selectLine = cy+1; 
					}else{
						selectColumn = Math.floor(cx/2);  
						selectLine = cy+1; 
					}
				}else{
					if(cy%2){
						selectColumn = Math.floor(cx/2);  
						selectLine = cy+1; 
					}else{
						selectColumn = Math.floor(cx/2);  
						selectLine = cy+1; 
					}
				}
				
				
			}
			
			
			
			
		}else{
			selectColumn = Math.floor(x/this.cell_width.get()); 	
			selectLine = Math.floor(y/this.cell_height.get());
		}
		
		return {'c': selectColumn, 'l': selectLine}; 
	}; 
	
}; 

Grid.ORTHOGNAL = 0; 
Grid.ISOMETRIC = 1;






