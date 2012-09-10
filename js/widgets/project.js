function UI_Layers(map, args, defs){
	UI.call(this, map, args, defs); 
	
	this.root = $('<ul />'); 
	
	this.update = function(map){
		this.root.html(''); 
		if(map != null){
			var l; 
			var layers = map.layers.get()
			for(l in layers){
				this.root.append($('<li>' + l + ' - ' + layers[l].name +'<li/>'));
			}
		}
	}; 
	
}; 



function UI_Map(map, args, defs){
	UI.call(this, map, args, defs); 
	this.name = new UI_Input(null, args, {'label':'Name'}); 
	this.grid = new UI_ItemsSelect(null, args, {'label':'Grid', 'items': null}); 
	this.unity_layer = new UI_Input(null, args, {'label':'Unity Layer', 'type': 'int'});  
	this.layers = new UI_Layers(null, args, {'label':'Layers'}); 
	
	
	var ui = new UI_Group(this, {'uis':
			[
				this.name, 
				this.grid, 
				this.unity_layer, 
				this.layers, 
			] 
		}
	); 
	
	this.root = ui.root; 
	
	this.update = function(map){
		if(map){
			this.name.update(map.name); 
			this.grid.update(map.grid, map.project.grids); 
			this.unity_layer.update(map.unity_layer); 
			this.layers.update(map); 
			this.root.show(); 
		}else{
			this.name.update(null); 
			this.grid.update(null, null); 
			this.unity_layer.update(null); 
			this.layers.update(null); 
			this.root.hide(); 
		}
	}; 
	
	this.update(map); 
}; 


function UI_GridDraw(grid, args, defs){
	UI.call(this, grid, args, defs); 
	
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
		}
							
		
		this.canvas_eselect.setAttribute('style', 'position: absolute; left:' +x +'px; top:'+y+'px;'); 
	}; 
	
	this.root.click(function(e){
			var xy = getPosition(e);
			// this.sc = Math.floor(xy.x/this.model.tile_w.get()); 
			// this.sl = Math.floor(xy.y/this.model.tile_h.get()); 
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
	
	this.update(grid); 
}; 

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
				this.sprites(ui); 
			}
		}
		
	}; 
	
	this.update(layer); 
	
}; 

function UI_MapDraw(map, args, defs){
	UI.call(this, map, args, defs); 
	
	this.root = $('<div class="map" />'); 
	
	this.grid = new UI_GridDraw(null, args, defs); 
	this.root.append(this.grid.root); 
	this.layers_root = $('<div class="layers" />'); 
	this.root.append(this.layers_root); 
	// TODO: Draw Map.
	// TODO: listing to tilemanagers/tile UI. 
	this.update_grid = function(){
		this.grid.update(this.map.grid.get()); 
	}.bind(this); 
	
	
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
	
	this.update(map);
}; 


function UI_Maps(maps, args, defs){
	UI.call(this, maps, args, defs); 
	
	var b = new UI_Button(maps, args, {'func': function(){ this.add(new Map({'project': this.father}) ); }.bind(maps) , 'label': 'Add'}); 
	var m = new UI_Items(maps, args, {'label': 'Maps', }); 	
	// var c = new UI_Content(m, args, {'mk': function(item){ return new UI_Map(item, this.args, this.defs); }.bind(this) }); 
	this.map = new UI_Map(null, args, defs); 
	this.map_draw = new UI_MapDraw(null, args, defs); 
	var ui =  new UI_Group(this, {'uis': [b, m, this.map, this.map_draw]}); 
	
	m.event('change', function(e){
		var item = e.args['item']; 
		this.map.update(item); 
		this.map_draw.update(item); 
		
	}.bind(this)); 
	
	this.root = ui.root; 
	
}; 

function UI_MapEditor(project, args, defs){
	UI.call(this, project,args, defs); 

	var ui = new UI_Group(this, {
		'uis': [
			new UI_Text(project.version, args, {'label':'Version'}), 
			new UI_Input(project.name, args, {'label':'Name'}), 
			new UI_Grids(project.grids, args, defs), 
			new UI_Maps(project.maps, args, defs), 
			new UI_TileManagers(project.tileManagers, args, defs), 
		] 
	}); 
	
	$('#project').append(ui.root); 

}; 



