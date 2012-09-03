
function UI_Map(map, args, defs){
	UI.call(this, map, args, defs); 
	this.name = new UI_Input(null, args, {'label':'Name'}); 
	this.grid = new UI_ItemsSelect(null, args, {'label':'Grid', 'items': null}); 
	this.unity_layer = new UI_Input(null, args, {'label':'Unity Layer', 'type': 'int'});  
	
	var ui = new UI_Group(this, {'uis':
			[
				this.name, 
				this.grid, 
				this.unity_layer, 
				// new UI_Layers(map.layers, args, {'label':'Layers'}),
			] 
		}
	); 
	
	this.root = ui.root; 
	
	this.update = function(map){
		if(map){
			this.name.update(map.name); 
			this.grid.update(map.grid, map.project.grids); 
			this.unity_layer.update(map.unity_layer); 
			this.root.show(); 
		}else{
			this.name.update(null); 
			this.grid.update(null, null); 
			this.unity_layer.update(null); 
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
			
		] 
	}); 
	
	$('#project').append(ui.root); 

}; 


