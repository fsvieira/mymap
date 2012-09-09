function UI_Move(mv, args, defs){
	UI.call(this, mv, args, defs); 
	
	this.root = $('<div class="move">'); 

	this.move       = new UI_Boolean(null, args, {'label': 'Move'}); 
	this.up         = new UI_Boolean(null, args, {'label': 'Up'}); 
	this.down       = new UI_Boolean(null, args, {'label': 'Down'}); 
	this.left       = new UI_Boolean(null, args, {'label': 'Left'}); 
	this.right      = new UI_Boolean(null, args, {'label': 'Right'}); 
	this.up_left    = new UI_Boolean(null, args, {'label': 'Up Left'}); 
	this.up_right   = new UI_Boolean(null, args, {'label': 'Up Right'}); 
	this.down_left  = new UI_Boolean(null, args, {'label': 'Down Left'}); 
	this.down_right = new UI_Boolean(null, args, {'label': 'Down Right'}); 
	
	
	var group = new UI_Group(null, 
					{'uis': 
						[this.move, this.up, this.down, this.left, this.right, this.up_left, this.up_right, this.down_left, this.down_right] 
					}
				); 
	
	this.root.append(group.root); 
	
	this.update = function(mv){
		if(mv){
			this.move.update(mv.move); 
			this.up.update(mv.up); 
			this.down.update(mv.down);
			this.left.update(mv.left);
			this.right.update(mv.right);
			this.up_left.update(mv.up_left);
			this.up_right.update(mv.up_right);
			this.down_left.update(mv.down_left);
			this.down_right.update(mv.down_right);
			this.root.show(); 
		}else{
			this.move.update(null); 
			this.up.update(null); 
			this.down.update(null);
			this.left.update(null);
			this.right.update(null);
			this.up_left.update(null);
			this.up_right.update(null);
			this.down_left.update(null);
			this.down_right.update(null);
			this.root.hide(); 
		} 
		
	}; 
	
	this.update(mv); 
}; 

function UI_Tile(tile, args, defs){
	UI.call(this, tile , args, defs); 
	
	this.move = new UI_Move(null, args, defs);
	this.root = this.move.root; 
	
	this.update = function(tile){
		this.move.update(tile); 
	}; 
	
	
	this.update(tile); 
	
}; 

function UI_Tiles(tm, args, defs){
	UI.call(this, tm, args, defs); 

	this.root = $('<div/>'); 
	
	this.tile = new UI_Tile(null, args, defs); 
	this.root.append(this.tile.root); 
	
	this.tiles = $('<div  style="position: absolute;" />'); 
	this.root.append(this.tiles); 
	
	this.image = new UI_Image(tm, args, defs); 
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.tiles.append(this.image.root); 
	this.tiles.append(this.canvas_elem); 
	
	
	this.canvas = this.canvas_elem.getContext("2d"); 
	
	this.select = $("<div class='tm_select' />");
	this.tiles.append(this.select); 
	
	
	
	this.sc = 0; 
	this.sl = 0; 
	
	this.tiles.click(function(e){
			var xy = getPosition(e);
			this.sc = Math.floor(xy.x/this.model.tile_w.get()); 
			this.sl = Math.floor(xy.y/this.model.tile_h.get()); 
			this.draw_select(); 
	}.bind(this)); 
	
	this.draw_select = function(){
		var width = this.model.tile_w.get(); 
		var height = this.model.tile_h.get();
		var border = 3*2; 
		this.select.css({
				'height': height-border,
				'width': width-border,
				'left': width*this.sc,
				'top': height*this.sl 
			});
			
		if(this.canvas_elem.width && this.canvas_elem.height){
			this.select.show(); 
			this.tile.update(this.model.getTile(this.sc, this.sl)); 
		}else{
			this.select.hide(); 
		}
	}; 
	
	
	
	this.draw_grid = function(){
		this.canvas.clearRect(0,0, this.canvas_elem.width, this.canvas_elem.height); 
		var w; var h; 
		var width = this.model.tile_w.get(); 
		var height = this.model.tile_h.get();  
		tc = Math.floor(this.canvas_elem.width/width); 
		tl = Math.floor(this.canvas_elem.height/height); 
		this.canvas.lineWidth = 1;
		this.canvas.strokeStyle = "#0000ff";

		
		this.sc = 0; 
		this.sl = 0; 
		this.draw_select(); 

		for(w=0; w<tc; w++){
			for(h=0; h<tl; h++){
				var x=w*width; 
				var y=h*height; 
				this.canvas.beginPath();
				this.canvas.moveTo(x,y);
				this.canvas.lineTo(x+width,y);
				this.canvas.lineTo(x+width,y+height);
				this.canvas.lineTo(x,y+height);
				this.canvas.closePath();
				this.canvas.stroke();
			}
		}
					
		
		 
	}.bind(this); 
	
	this.set_grid = function(){
		this.canvas_elem.width = this.image.canvas_elem.width; 
		this.canvas_elem.height = this.image.canvas_elem.height; 
		this.draw_grid(); 
	}; 
	
	// this.model.tile_w.event('change', this.draw_grid.bind(this)); 
	// this.model.tile_h.event('change', this.draw_grid.bind(this)); 
	
	this.image.event('change', this.set_grid.bind(this)); 
	
	// this.set_grid(); 
	this.update = function(tm){
		if(this.model){
			this.model.tile_w.remove_event('change', this.draw_grid); 
			this.model.tile_h.remove_event('change', this.draw_grid); 
		}
		this.model = tm; 
		if(this.model){
			this.model.tile_w.event('change', this.draw_grid); 
			this.model.tile_h.event('change', this.draw_grid);
			this.image.update(tm);
			// this.tile.update(tiles); 
			this.set_grid(); 
			this.root.show(); 
			
		}else{
			this.root.hide(); 
		}
	}; 
	
	this.update(tm); 
	
}; 

function UI_Image(tm, args, defs){
	UI.call(this, tm, args, defs); 
	
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.root = this.canvas_elem; 
	this.canvas = this.canvas_elem.getContext("2d"); 

	this.load_image = function(){
		this.canvas_elem.height = 0; 
		this.canvas_elem.width = 0; 
		if(this.model.image.get() != null){
			var path = 'images/'+this.model.image.get(); 
			this.image = new Image(); 
			this.image.onload = function(){
				this.canvas_elem.height = this.image.height; 
				this.canvas_elem.width = this.image.width; 
				this.canvas.drawImage(this.image, 0, 0); 
				
				if(this.image.height < this.model.tile_h.get()){
					this.model.tile_h.set(this.image.height); 
				}
				
				if(this.image.width < this.model.tile_w.get()){
					this.model.tile_w.set(this.image.width); 
				}
				
				if(this.model.alpha.get()){
					imgd = this.canvas.getImageData(0, 0, this.image.width, this.image.height); 
					bw_data(imgd); 
					this.canvas.putImageData(imgd, 0, 0,this.image.width, this.image.height); 
				}
				this.trigger_event(new Event(['change'], {'model': this})); 
			}.bind(this); 
			this.image.src = path; 
		}else{
			this.trigger_event(new Event(['change'], {'model': this})); 
		}
		
	}.bind(this); 

	this.update = function(model){
		if(this.model){
			this.model.image.remove_event('change', this.load_image); 
		}
		
		this.model = model; 
		if(this.model){
			this.load_image(); 
		}
	}

	this.update(tm); 
	
}; 

function UI_TileManager(tm, args, defs){
	UI.call(this, tm, args, defs); 
	
	 this.name = new UI_Input(null, args, {'label':'Name'});
 	 this.w = new UI_Input(null, args, {'label':'Tile Width', 'type': 'int', 'hideLabel': true,}); 
	 this.h = new UI_Input(null, args, {'label':'Tile Height', 'type': 'int', 'hideLabel': true,}); 
	 var wh = new UI_Tuplo(null, args, {'a': this.w, 'b': this.h, 'label': 'Tile Width x Height', 'separator': 'x' }); 
	 this.image = new UI_Input(null, args, {'label':'Image', 'type': 'file' }); 	
	 this.show_tiles = new UI_Tiles(null, args, defs); 
 	 var ui = new UI_Group(this, {'uis': [this.name, wh, this.image, this.show_tiles]});
	
 	 this.root = ui.root; 
 	 
 	 this.update = function(tm){
		this.model = tm;  
		if(tm == null){
			this.name.update(null); 
			this.w.update(null); 
			this.h.update(null); 
			this.image.update(null); 
			this.show_tiles.update(null);
			this.root.hide(); 	
		}else{
			this.name.update(tm.name); 
			this.w.update(tm.tile_w); 
			this.h.update(tm.tile_h); 
			this.image.update(tm.image); 
			this.show_tiles.update(tm);
			this.root.show(); 
		} 
	 }; 
 	 
 	 this.update(tm); 
 	 
}; 

function UI_TileManagers(tms, args, defs){
	UI.call(this, tms, args, defs); 
	
	var b1 = new UI_Button(tms, args, {'func': function(){ this.add(new TileManager(false) ); }.bind(tms) , 'label': 'Add'})
    var b2 = new UI_Button(tms, args, {'func': function(){ this.add(new TileManager(true) ); }.bind(tms) , 'label': 'Add Alpha'})
	var m = new UI_Items(tms, args, {'label': 'Maps',}); 	
	this.tm = new UI_TileManager(null, args, defs); 
	var ui = new UI_Group(this, {'uis': [b1,b2,  m, this.tm]}); 
	
	m.event('change', function(e){
		var item = e.args['item']; 
		this.tm.update(item); 
	}.bind(this)); 
	
	this.root = ui.root; 
}; 

