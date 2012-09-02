function UI_Grid(grid, args, defs){
	UI.call(this, grid, args, defs); 

	var type = new UI_Enum(grid.type, args, {'enums': ['Orthogonal', 'Isometric']});
	var a = new UI_Input(grid.columns, args, {'label':'Columns', 'type':'int', 'hideLabel': true,});  
	var b = new UI_Input(grid.lines, args, {'label':'Lines', 'type':'int', 'hideLabel': true,});
	var tcl = new UI_Tuplo(grid, args, {'a': a, 'b': b, 'label': 'Columns x Lines', 'separator': 'x' }); 

	var a = new UI_Input(grid.cell_width, args, {'label':'Cell width', 'type':'int', 'hideLabel': true, }); 
	var b = new UI_Input(grid.cell_height, args, {'label':'Cell height', 'type':'int', 'hideLabel': true,}); 
	var twh = new UI_Tuplo(grid, args, {'a': a, 'b': b, 'label': 'Cell Width x Height', 'separator': 'x' }); 

	var ui = new UI_Group(grid, {'uis': [type, tcl, twh]}); 
	
	this.root = ui.root; 
	
}; 

function UI_Grids(grids, args, defs){
	UI.call(this, grids, args, defs); 
	
	var b = new UI_Button(grids, args, {'func': function(){ this.add(new Grid(Grid.ORTHOGNAL, 10, 7, 32, 32) ); }.bind(grids) , 'label': 'Add'});
	var m = new UI_Items(grids, args, {'label': 'Grids'});
	var c = new UI_Content(m, args, {'mk': function(item){ return new UI_Grid(item, this.args, this.defs); }.bind(this) }); 
	var ui = new UI_Group(this, {'uis': [b, m, c],}); 
	
	this.root = ui.root; 
	
}; 

