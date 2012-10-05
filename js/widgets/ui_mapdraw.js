function UI_Sprite(cell, args, defs){
	UI.call(this, cell, args, defs); 
	
	this.canvas_elem = document.createElement('canvas'); 
	this.canvas = this.canvas_elem.getContext('2d'); 
	
	this.canvas_elem.setAttribute('class', 'sprite'); 
	
	this.root = this.canvas_elem; 
	
	this.cell = cell; 
	this.counter = 0; 

	this.frame = function(){	
		this.canvas.putImageData(
			this.cell.image[this.counter], 
			0, 0, 
			cell.getTileWidth(), 
			cell.getTileHeight()
		); 
		
		this.counter++; 
		if(this.counter >= cell.frames){
			this.counter = 0; 
		}; 
	}
	
	this.setPosition = function(pos){
		this.root.setAttribute('style', 'top: '+pos.y+'px; left: '+ pos.x + 'px; z-index: ' + pos.z + ';' ); 
	};
	
	this.update = function(cell){
		this.cell = cell; 
		if(cell){
			this.canvas_elem.width = cell.getTileWidth(); 
			this.canvas_elem.height = cell.getTileHeight();
			
			this.setPosition(cell.getPosition()); 
			
			this.counter = 0; 	
			this.frame(); 
		}
	}; 
	
	this.update(cell);
	
}; 


function UI_LayerDraw(layer, args, defs){
	UI.call(this, layer, args, defs); 
	
	this.sprites = []; 
	
	this.root = $('<div class="layer" />'); 
	
	this.resize = function(w, h){
		this.root.width(w); 
		this.root.height(h); 
	}; 
	
	this.update = function(layer){
		if(this.sprites){
			// clean 
		}
		
		var c, l;
		var cells = layer.cells.get();
		for(c in cells){
			for(l in cells[c]){
				var ui = new UI_Sprite(cells[c][l]); 
				this.sprites.push(ui); 
				this.root.append(ui.root); 
				this.sprites.push(ui); 
			}
		}
		
	}; 
	
	this.animate = function(){
		for(i in this.sprites){
			this.sprites[i].frame(); 
		}
	}; 
	
	
	
	this.update(layer); 
	
}; 


function UI_Cell(args, defs){
	UI.call(this, args, defs); 
	this.cell = null;
	this.move = new UI_Move(args, defs);
	this.root = $('<div />');  
	
	this.mapdraw = this.option('ui_mapdraw'); 
	this.root.append(this.move.root); 
	
	this.mapdraw.event('select', function(e){
		this.update(e.args.cell); 
	}.bind(this)); 
	
	this.update = function(cell){
		this.cell = cell; 
		if(this.cell){
			this.move.update(cell); 
			this.root.show();
		}else{
			this.root.hide();
			this.move.update(null); 
		}
	}; 
	
	
	this.getCell = function(){
		return this.cell; 
	};
	
	this.update(this.option('cell')); 
	
}; 


function UI_MapDraw(args, defs){
	UI.call(this,args, defs); 
	
	this.root = $('<div class="map" />'); 
	
	this.ui_map = this.option('ui_map'); 
	
	this.ui_map.event('change', function(e){
		this.update(e.args.item); 
	}.bind(this)); 
	
	this.ui_tile = this.option('ui_tile');
	
	this.grid = new UI_GridDraw(args, defs); 
	this.root.append(this.grid.root); 
	this.layers_root = $('<div class="layers" />'); 
	this.root.append(this.layers_root); 
	
	this.update_grid = function(){
		this.grid.update(this.map.grid.get()); 
		this.resize(this.map.grid.get()); 
	}.bind(this); 
	
	this.grid.event('select', function(e){
		var tile = this.ui_tile.getTile(); 
		var layer = this.ui_map.getLayer(); 
		if(tile && layer){
			layer.addTile(e.args.c, e.args.l, tile); 
		}
		
		this.trigger_event(new Event(['select'], {'cell': layer.getCell(e.args.c, e.args.l) } )); 
		
	}.bind(this));
	
	this.layers = []; 
	
	this.resize = function(){
		var grid = this.map.grid.get(); 
		if(grid){
			var w, h; 
			w = grid.getWidth(); h = grid.getHeight(); 
			this.layers_root.width(w); 
			this.layers_root.height(h); 
			var i; 
			for(i in this.layers){
				this.layers[i].resize(w, h); 
			}
		}; 
	}; 
	
	this.animate = function(){
		for(i in this.layers){
			this.layers[i].animate(); 
		}
	}; 
	
	this.update = function(map){
		if(this.map){
			this.map.grid.remove_event('change', this.update_grid); 
		}
		
		// TODO, clean layers.
		
		this.map = map; 
		this.layers = []; 
		this.layers_root.html(''); 
		
		if(map){
			this.grid.update(map.grid.get()); 
			this.map.grid.event('change', this.update_grid); 
			var l; 
			var layers = this.map.layers.get(); 
			for(l in layers){
				var ui = new UI_LayerDraw(layers[i])
				this.layers_root.append(ui.root); 
				this.layers.push(ui); 
			}
			
			this.resize(); 
			
			this.root.show(); 
		}else{
			this.grid.update(null);
			this.root.hide();  
		}
		
	};
	
	this.update(this.option('map'));
}; 


