function UI_GridDraw(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<div class="grid" style="position:relative;"/>'); 
	this.canvas_elem = document.createElement('canvas'); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.canvas = this.canvas_elem.getContext("2d"); 
	
	this.canvas_eselect = document.createElement('canvas'); 
	this.canvas_eselect.setAttribute('style', 'position: absolute;'); 
	this.canvas_select = this.canvas_eselect.getContext("2d"); 
	
	
	this.root.append(this.canvas_elem); 
	this.root.append(this.canvas_eselect); 
	
	this.sx = 0; 
	this.sy = 0; 
	
	this.draw_select = function(){
		
		var x = this.sx*this.grid.cell_width.get();
		var y = this.sy*this.grid.cell_height.get();
										
		if(this.grid.type.get()==1){
			x += this.grid.cell_width.get()/2; 
			y -= this.grid.cell_height.get();
		}
							
		this.trigger_event(new Event(['select'], {'c': this.sx, 'l':this.sy}));
		this.canvas_eselect.setAttribute('style', 'position: absolute; left:' +x +'px; top:'+y+'px;'); 
	}; 
	
	this.root.click(function(e){
			var xy = getPosition(e);
			var pos = this.grid.onSelect(xy.x, xy.y); 
			this.sx = pos.c; 
			this.sy = pos.l; 
			this.draw_select(); 
	}.bind(this)); 
	
	this.draw = function(){
		var g = this.grid; 
		if(g){
			var w; var h; 
			
			w = g.getWidth(); 
			h = g.getHeight(); 
			
			this.canvas_elem.width = w; 
			this.canvas_elem.height = h; 
			this.root.width(w); 
			this.root.height(h); 
			
			var wm = g.cell_width.get()/2;
			var hm = g.cell_height.get()/2;
				
			
			this.canvas_eselect.width = g.cell_width.get();
			this.canvas_eselect.height = g.cell_height.get();
			
			this.canvas_select.lineWidth = 5;
			this.canvas_select.strokeStyle = "#FF0000";
				
			if(g.type.get()==0){
				this.canvas_select.beginPath();
				this.canvas_select.moveTo(0,0);
				this.canvas_select.lineTo(g.cell_width.get(),0);
				this.canvas_select.lineTo(g.cell_width.get(),g.cell_height.get());
				this.canvas_select.lineTo(0,g.cell_height.get());
				this.canvas_select.closePath();
				this.canvas_select.stroke();
			}else{
				this.canvas_select.beginPath();
				this.canvas_select.moveTo(wm,0);
				this.canvas_select.lineTo(g.cell_width.get(),hm);
				this.canvas_select.lineTo(wm,g.cell_height.get());
				this.canvas_select.lineTo(0,hm);
				this.canvas_select.closePath();
				this.canvas_select.stroke();
			}	
			
			this.canvas.lineWidth = 1;
			this.canvas.strokeStyle = "#A8A8A8";
				
			for(w=0; w<g.columns.get(); w++){
				for(h=0; h<g.lines.get(); h++){
						var x = w*g.cell_width.get();
						var y = h*g.cell_height.get();
										
						if(g.type.get()==0){
							this.canvas.beginPath();
							this.canvas.moveTo(x,y);
							this.canvas.lineTo(x+g.cell_width.get(),y);
							this.canvas.lineTo(x+g.cell_width.get(),y+g.cell_height.get());
							this.canvas.lineTo(x,y+g.cell_height.get());
							this.canvas.closePath();
							this.canvas.stroke();
						}else{
							this.canvas.beginPath();
							this.canvas.moveTo(x+wm,y);
							this.canvas.lineTo(x+g.cell_width.get(),y+hm);
							this.canvas.lineTo(x+wm,y+g.cell_height.get());
							this.canvas.lineTo(x,y+hm);
							this.canvas.closePath();
							this.canvas.stroke();
						}
				}
			}
			
			this.draw_select(); 
			
			this.root.show(); 
		}else{
			this.root.hide(); 
		}
	}.bind(this);
	
	
	this.update = function(grid){
		if(this.grid){
			this.grid.remove_event('change', this.draw); 
		}
		
		this.grid = grid; 
		if(this.grid){
			this.grid.event('change', this.draw);
		}
		
		this.draw(); 
	}; 
	
	this.update(this.option('grid')); 
}; 
