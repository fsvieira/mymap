
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

function UI_TileManager(tm, args, defs){
	UI.call(this, tm, args, defs); 
	
	 var name = new UI_Input(tm.name, args, {'label':'Name'});
 	 var w = new UI_Input(tm.tile_w, args, {'label':'Tile Width', 'type': 'int', 'hideLabel': true,}); 
	 var h = new UI_Input(tm.tile_h, args, {'label':'Tile Height', 'type': 'int', 'hideLabel': true,}); 
	 var wh = new UI_Tuplo(tm, args, {'a': w, 'b': h, 'label': 'Tile Width x Height', 'separator': 'x' }); 
	 var image = new UI_Input(tm.image, args, {'label':'Image', 'type': 'file'}); 	
 	 var ui = new UI_Group(this, {'uis': [name, wh, image] });
	
	 tm.image.event('change', function(e){
			alert('image load'); 
		 }.bind(tm)
	 ); 
	
 	 this.root = ui.root; 
}; 

function UI_TileManagers(tms, args, defs){
	UI.call(this, tms, args, defs); 
	
	this.mk = function(item){
		return new UI_TileManager(item, args, defs); 
	}; 
	
	var b1 = new UI_Button(tms, args, {'func': function(){ this.add(new TileManager(false) ); }.bind(tms) , 'label': 'Add'})
    var b2 = new UI_Button(tms, args, {'func': function(){ this.add(new TileManager(true) ); }.bind(tms) , 'label': 'Add Alpha'})
	var m = new UI_Items(tms, args, {'label': 'Maps',}); 	
	var c = new UI_Content(m, args, {'mk': this.mk}); 
	var ui = new UI_Group(this, {'uis': [b1,b2,  m, c]}); 
	
	this.root = ui.root; 
}; 

function UI_MapEditor(project, args, defs){
	UI.call(this, project,args, defs); 

	var ui = new UI_Group(this, {
		'uis': [
			new UI_Text(project.version, args, {'label':'Version'}), 
			new UI_Input(project.name, args, {'label':'Name'}), 
			new UI_Grids(project.grids, args, {'mk': function(item){return new UI_Group(this, {'uis': UI.mkUI(item)});}}), 
			new UI_Maps(project.maps, args, {'mk': function(item){return new UI_Group(this, {'uis': UI.mkUI(item)});}}), 
			new UI_TileManagers(project.tileManagers, args, defs), 
			
		] 
	}); 
	
	$('#project').append(ui.root); 

}; 


