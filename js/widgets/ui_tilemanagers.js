function UI_Move(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<div class="move">'); 

	this.move       = new UI_BooleanIcon(args, {'label': 'Move', 'active': 'move_active', 'inactive': 'move_inactive' }); 
	this.up         = new UI_BooleanIcon(args, {'label': 'Up', 'active': 'up_active', 'inactive': 'up_inactive'}); 
	this.down       = new UI_BooleanIcon(args, {'label': 'Down', 'active': 'down_active', 'inactive': 'down_inactive'}); 
	this.left       = new UI_BooleanIcon(args, {'label': 'Left', 'active': 'left_active', 'inactive': 'left_inactive'}); 
	this.right      = new UI_BooleanIcon(args, {'label': 'Right', 'active': 'right_active', 'inactive': 'right_inactive'}); 
	this.up_left    = new UI_BooleanIcon(args, {'label': 'Up Left', 'active': 'up_left_active', 'inactive': 'up_left_inactive'}); 
	this.up_right   = new UI_BooleanIcon(args, {'label': 'Up Right', 'active': 'up_right_active', 'inactive': 'up_right_inactive'}); 
	this.down_left  = new UI_BooleanIcon(args, {'label': 'Down Left', 'active': 'down_left_active', 'inactive': 'down_left_inactive'}); 
	this.down_right = new UI_BooleanIcon(args, {'label': 'Down Right', 'active': 'down_right_active', 'inactive': 'down_right_inactive'}); 

	var table = $('<table />'); 
	this.root.append(table); 

	var tr = $('<tr />'); 
	table.append(tr); 
	
	/* top */
	var td = $('<td />');
	td.append(this.up_left.root); 
	tr.append(td); 

	td = $('<td />');
	td.append(this.up.root); 
	tr.append(td); 
	
	td = $('<td />');
	td.append(this.up_right.root); 
	tr.append(td); 

	/* middle */
	tr = $('<tr />'); 
	table.append(tr); 

	td = $('<td />');
	td.append(this.left.root); 
	tr.append(td); 

	td = $('<td />');
	td.append(this.move.root); 
	tr.append(td); 
	
	td = $('<td />');
	td.append(this.right.root); 
	tr.append(td); 
		
	/* bottom */
	tr = $('<tr />'); 
	table.append(tr); 


	td = $('<td />');
	td.append(this.down_left.root); 
	tr.append(td); 

	td = $('<td />');
	td.append(this.down.root); 
	tr.append(td); 
	
	td = $('<td />');
	td.append(this.down_right.root); 
	tr.append(td); 

	// ---
		
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
	
	this.update(this.option('mv')); 
}; 

function UI_Tile(args, defs){
	UI.call(this, args, defs); 
	this.tile = null;
	this.move = new UI_Move(args, defs);
	this.root = $('<div />');  
	
	this.tiles = this.option('ui_tiles'); 
	this.frames = new UI_InputInt( args, {'label':'Frames',}); 
	this.repeat = new UI_InputInt( args, {'label':'Repeat',}); 
	
	this.root.append(this.frames.root); 
	this.root.append(this.repeat.root); 
	this.root.append(this.move.root); 
	
	this.tiles.event('change', function(e){
		this.update(this.tiles.getTile()); 
	}.bind(this)); 
	
	this.update = function(tile){
		this.tile = tile; 
		if(this.tile){
			this.move.update(tile); 
			this.frames.update(tile.frames); 
			this.repeat.update(tile.repeat); 
			this.root.show();
		}else{
			this.root.hide();
			this.move.update(null); 
			
		}
	}; 
	
	
	this.getTile = function(){
		return this.tile; 
	};
	
	this.update(this.option('tile')); 
	
}; 

function UI_Tiles(args, defs){
	UI.call(this, args, defs); 

	this.root = $('<div class="tiles" />'); 
	
	this.tm = this.option('ui_tm'); 
	
	this.tm.event('change', function(e){
		this.update(e.args.tm); 
	}.bind(this)); 
	
	
	// this.tile = new UI_Tile(args, defs); 
	// this.root.append(this.tile.root); 
	
	this.tiles = $('<div style="position: relative;"/>'); 
	this.root.append(this.tiles); 
	
	this.image = new UI_Image(args, defs); 
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.tiles.append(this.image.root); 
	this.tiles.append(this.canvas_elem); 
	
	
	this.canvas = this.canvas_elem.getContext("2d"); 
	
	this.select = $("<div class='tm_select' />");
	this.tiles.append(this.select); 
	
	
	this.sc = 0; 
	this.sl = 0; 
	
	this.getTile = function(){
		if(this.model.image.get()){
			return this.model.getTile(this.sc, this.sl); 
		}else{
			return null; 
		}
	}; 
	
	this.tiles.click(function(e){
			var xy = getPosition(e);
			this.sc = Math.floor(xy.x/this.model.tile_w.get()); 
			this.sl = Math.floor(xy.y/this.model.tile_h.get()); 
			this.draw_select(); 
			this.trigger_event(new Event(['change', {}]));
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
			// this.tile.update(this.model.getTile(this.sc, this.sl)); 
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
		this.tiles.width(this.image.canvas_elem.width); 
		this.tiles.height(this.image.canvas_elem.height); 
		
		this.canvas_elem.width = this.image.canvas_elem.width; 
		this.canvas_elem.height = this.image.canvas_elem.height; 
		this.draw_grid(); 
	}; 
	
	
	this.image.event('change', this.set_grid.bind(this)); 
	
	
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
		
		this.trigger_event(new Event(['change', {}]));
	}; 
	
	this.update(this.option('tm')); 
	
}; 

function UI_Image(args, defs){
	UI.call(this, args, defs); 
	
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.root = this.canvas_elem; 
	this.canvas = this.canvas_elem.getContext("2d"); 
	this.canvas_elem.height = 0; 
	this.canvas_elem.width = 0; 

	this.load_image = function(){
		var imgd = this.model.getImage(); 
		this.canvas_elem.height = imgd.height; 
		this.canvas_elem.width = imgd.width; 
		this.canvas.putImageData(imgd, 0, 0,imgd.width, imgd.height); 
		this.trigger_event(new Event(['change'], {'model': this})); 
	}.bind(this); 
	

	this.update = function(model){
		if(this.model){
			this.model.remove_event('ready', this.load_image); 
		}
		
		this.model = model; 
		if(this.model){
			this.model.event('ready', this.load_image); 
			if(this.model.imgd){
				this.load_image(); 
			}
		}
	}

	this.update(this.option('tm')); 
	
}; 

function UI_TileManager(args, defs){
	UI.call(this, args, defs); 
	
	this.tms = this.option('tms'); 
	
	this.tms.event('change', function(e){
		this.update(e.args.item);
	}.bind(this));
	
	 this.name = new UI_InputText(args, {'label':'Name'});
 	 this.w = new UI_InputInt( args, {'label':'Tile Width', 'hideLabel': true,}); 
	 this.h = new UI_InputInt(args, {'label':'Tile Height', 'hideLabel': true,}); 
	 var wh = new UI_Tuplo( args, {'a': this.w, 'b': this.h, 'label': 'Tile Width x Height', 'separator': 'x' }); 
	 this.image = new UI_InputFile( args, {'label':'Image', }); 	 
 	 var ui = new UI_Group( {'uis': [this.name, wh, this.image, ]});
	
 	 this.root = ui.root; 
 	 
 	 this.update = function(tm){
		this.model = tm;  
		if(tm == null){
			this.name.update(null); 
			this.w.update(null); 
			this.h.update(null); 
			this.image.update(null); 
			//this.show_tiles.update(null);
			this.root.hide(); 	
		}else{
			this.name.update(tm.name); 
			this.w.update(tm.tile_w); 
			this.h.update(tm.tile_h); 
			this.image.update(tm.image); 
			//this.show_tiles.update(tm);
			this.root.show(); 
		}
		
		this.trigger_event(new Event(['change'], {'tm': tm})); 
	 }; 
 	 
 	 this.update(this.option('tm')); 
 	 
}; 

function UI_TileManagers(args, defs){
	UI.call(this, args, defs); 
	
	this.b1 = new UI_ButtonIcon(args, {'label': 'Add', 'active': 'add'});
    this.b2 = new UI_ButtonIcon(args, {'label': 'Add Alpha', 'active': 'add_alpha'}); 
	this.m  = new UI_Items(args, {'label': 'Maps',}); 	
	// this.tm = new UI_TileManager(args, defs); 
	var ui  = new UI_Group(args, {'uis': [this.b1,this.b2,  this.m]}); 
	
	this.m.event('change', function(e){
		var item = e.args['item']; 
		this.trigger_event(new Event(['change'], {'item': item}));
		// this.tm.update(item); 
	}.bind(this)); 
	
	this.root = ui.root; 
	
	this.update = function(tms){
		this.b1.update(function(){ this.add(new TileManager(false) ); }.bind(tms)); 
		this.b2.update(function(){ this.add(new TileManager(true) ); }.bind(tms)); 
		this.m.update(tms); 
	};
	
}; 

