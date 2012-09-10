function UI_Map(args, defs){
	UI.call(this, args, defs); 
	this.name = new UI_Input(args, {'label':'Name'}); 
	this.grid = new UI_ItemsSelect(args, {'label':'Grid', 'items': null}); 
	this.unity_layer = new UI_Input(args, {'label':'Unity Layer', 'type': 'int'});  
	this.layers = new UI_Layers(args, {'label':'Layers'}); 
	
	
	this.maps = this.option('maps'); 
	
	this.maps.event('change', function(e){
		this.update(e.args.item); 
	}.bind(this)); 
	
	
	this.getLayer = function(){
		return this.layers.getLayer(); 
	}; 
	
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
			this.map = map; 
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
		
		this.trigger_event(new Event(['change'], {'item': map})); 
	}; 
	
	this.update(this.option('map')); 
}; 

function UI_Maps(args, defs){
	UI.call(this,args, defs); 
	
	this.b = new UI_Button(args, {'label': 'Add'}); 
	this.m = new UI_Items(args, {'label': 'Maps', }); 	
	// this.map = new UI_Map(args, defs); 
	var ui =  new UI_Group(args, {'uis': [this.b, this.m]}); 
	
	this.m.event('change', function(e){
		var item = e.args['item']; 
		// this.map.update(item); 
		this.trigger_event(new Event(['change',], {'item': item}));
	}.bind(this)); 
	
	this.root = ui.root; 
	
	this.update = function(maps){
		if(maps){
			this.b.update(function(){ this.add(new Map({'project': this.father}) ); }.bind(maps)); 
			this.m.update(maps); 
			this.root.show();
		}else{
			this.b.update(null); 
			this.m.update(null); 
			this.root.hide();
		}
	}; 
	
	this.update(this.option('maps')); 
}; 
