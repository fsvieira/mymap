
function UI_Map(map, args, defs){
	UI.call(this, map, args, defs); 
	var ui = new UI_Group(this, {'uis':
			[
				new UI_Input(map.name, args, {'label':'Name'}), 
				new UI_Items(map.grid, args, {'label':'Grid', 'items': map.project.grids}),
				new UI_Input(map.unit_layer, args, {'label':'Unity Layer'}), 
				// new UI_Layers(map.layers, args, {'label':'Layers'}),
			] 
		}
	); 
	
	this.root = ui.root; 
	
}; 

function UI_Maps(maps, args, defs){
	UI.call(this, maps, args, defs); 
	
	var b = new UI_Button(maps, args, {'func': function(){ this.add(new Map({'project': this.father}) ); }.bind(maps) , 'label': 'Add'}); 
	var m = new UI_Items(maps, args, {'label': 'Maps', }); 	
	var c = new UI_Content(m, args, {'mk': function(item){ return new UI_Map(item, this.args, this.defs); }.bind(this) }); 
	var ui =  new UI_Group(this, {'uis': [b, m, c]}); 
	
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


