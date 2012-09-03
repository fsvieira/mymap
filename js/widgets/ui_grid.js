function UI_Grid(grid, args, defs){
	UI.call(this, grid, args, defs); 

	this.type = new UI_Enum(null, args, {'enums': ['Orthogonal', 'Isometric']});
	this.c = new UI_Input(null, args, {'label':'Columns', 'type':'int', 'hideLabel': true,});  
	this.l = new UI_Input(null, args, {'label':'Lines', 'type':'int', 'hideLabel': true,});
	var tcl = new UI_Tuplo(null, args, {'a': this.c, 'b': this.l, 'label': 'Columns x Lines', 'separator': 'x' }); 

	this.cw = new UI_Input(null, args, {'label':'Cell width', 'type':'int', 'hideLabel': true, }); 
	this.ch = new UI_Input(null, args, {'label':'Cell height', 'type':'int', 'hideLabel': true,}); 
	var twh = new UI_Tuplo(null, args, {'a': this.cw, 'b': this.ch, 'label': 'Cell Width x Height', 'separator': 'x' }); 

	var ui = new UI_Group(grid, {'uis': [this.type, tcl, twh]}); 
	
	this.root = ui.root; 
	
	this.update = function(grid){
		this.model = grid; 
		if(grid){
			this.type.update(grid.type); 
			this.c.update(grid.columns); 
			this.l.update(grid.lines); 
			this.cw.update(grid.cell_width);
			this.ch.update(grid.cell_height); 
			this.root.show(); 
		}else{
			this.type.update(null); 
			this.c.update(null); 
			this.l.update(null); 
			this.cw.update(null);
			this.ch.update(null); 
			this.root.hide(); 
		}
	}; 
	
	this.update(grid); 
}; 

function UI_Grids(grids, args, defs){
	UI.call(this, grids, args, defs); 
	
	var b = new UI_Button(grids, args, {'func': function(){ this.add(new Grid(Grid.ORTHOGNAL, 10, 7, 32, 32) ); }.bind(grids) , 'label': 'Add'});
	var m = new UI_Items(grids, args, {'label': 'Grids'});
	this.grid = new UI_Grid(null, args, defs); 
	var ui = new UI_Group(this, {'uis': [b, m, this.grid],}); 
	
	m.event('change', function(e){
		var item = e.args['item']; 
		this.grid.update(item); 
	}.bind(this)); 
	
	this.root = ui.root; 
	
}; 

