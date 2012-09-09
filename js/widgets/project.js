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
	
	this.root = $('<div class"grid" />'); 
	this.canvas_elem = document.createElement('canvas'); 
	this.canvas = this.canvas_elem.getContext("2d"); 
	
	this.sx = 0; 
	this.sy = 0; 
	
	this.update = function(grid){
		if(grid){
			w = grid.getWidth(); 
			h = grid.getHeight(); 
			
			this.canvas_elem.width = w; 
			this.canvas_elem.height = h; 
			this.root.width(w); 
			this.root.height(h); 
			
			this.root.show(); 
		}else{
			this.root.hide(); 
		}
	}; 
	
	this.update(grid); 
}; 

function UI_MapDraw(map, args, defs){
	UI.call(this, map, args, defs); 
	
	this.root = $('<div class="map" />'); 
	
	this.grid = new UI_GridDraw(null, args, defs); 
	this.root.append(this.grid.root); 
	// TODO: Draw Map.
	
	// TODO: listing to tilemanagers/tile UI. 
	
	this.update = function(map){
		if(map){
			this.grid.update(map.grid); 
			this.root.show(); 
		}else{
			this.gird.update(null);
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
	var ui =  new UI_Group(this, {'uis': [b, m, this.map]}); 
	
	m.event('change', function(e){
		var item = e.args['item']; 
		this.map.update(item); 
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
			new UI_MapDraw(project, args, defs), 
		] 
	}); 
	
	$('#project').append(ui.root); 

}; 



