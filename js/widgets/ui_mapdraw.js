function UI_Sprite(cell, args, defs){
	UI.call(this, cell, args, defs); 
	
	this.canvas_elem = document.createElement('canvas'); 
	this.root = this.canvas_elem; 
	
	this.update = function(cell){
		
	}; 
	
	this.update(cell);
	
}; 


function UI_LayerDraw(layer, args, defs){
	UI.call(this, layer, args, defs); 
	
	this.sprites = []; 
	
	this.root = $('<div class="layer" />'); 
	
	this.update = function(layer){
		if(this.sprites){
			// clean 
		}
		
		var c, l;
		var cells = layer.cells.get();
		for(c in cells){
			for(l in cells[c]){
				var ui = new UI_Sprite(cells[c][l]); 
				this.root.append(ui.root); 
				this.sprites.push(ui); 
			}
		}
		
	}; 
	
	this.update(layer); 
	
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
	// TODO: Draw Map.
	// TODO: listing to tilemanagers/tile UI. 
	this.update_grid = function(){
		this.grid.update(this.map.grid.get()); 
	}.bind(this); 
	
	this.grid.event('select', function(e){
		var tile = this.ui_tile.getTile(); 
		var layer = this.ui_map.getLayer(); 
		if(tile && layer){
			layer.addTile(e.args.c, e.args.l, tile); 
		}
	}.bind(this));
	
	this.layers = []; 
	
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
			this.map.grid.event('change', this.upgrade_grid); 
			var l; 
			var layers = this.map.layers.get(); 
			for(l in layers){
				var ui = new UI_LayerDraw(layers[i])
				this.layers_root.append(ui.root); 
				this.layers.push(ui); 
			}
			
			this.root.show(); 
		}else{
			this.grid.update(null);
			this.root.hide();  
		}
		
	};
	
	this.update(this.option('map'));
}; 


