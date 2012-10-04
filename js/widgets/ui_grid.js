function UI_Grid(args, defs){
	UI.call(this, args, defs); 

	this.type = new UI_Enum(args, {'enums': ['Orthogonal', 'Isometric']});
	this.c = new UI_InputInt(args, {'label':'Columns', 'hideLabel': true,});  
	this.l = new UI_InputInt(args, {'label':'Lines', 'hideLabel': true,});
	var tcl = new UI_Tuplo(args, {'a': this.c, 'b': this.l, 'label': 'Columns x Lines', 'separator': 'x' }); 

	this.cw = new UI_InputInt(args, {'label':'Cell width', 'hideLabel': true, }); 
	this.ch = new UI_InputInt(args, {'label':'Cell height', 'hideLabel': true,}); 
	var twh = new UI_Tuplo(args, {'a': this.cw, 'b': this.ch, 'label': 'Cell Width x Height', 'separator': 'x' }); 

	var ui = new UI_Group(args, {'uis': [this.type, tcl, twh]}); 
	
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
	
	this.update(this.option('grid')); 
}; 

function UI_Grids(args, defs){
	UI.call(this, args, defs); 
	
	this.b = new UI_Button(args, {'label': 'Add'});
	this.m = new UI_Items(args, defs);
	this.grid = new UI_Grid(args, defs); 
	var ui = new UI_Group(args, {'uis': [this.b, this.m, this.grid], label: 'Grids'}); 
	
	this.m.event('change', function(e){
		var item = e.args['item']; 
		this.grid.update(item); 
	}.bind(this)); 
	
	this.root = ui.root; 
	
	this.update = function(grids){
		if(grids){
			this.b.update(function(){ this.add(new Grid(Grid.ORTHOGNAL, 10, 7, 32, 32) ); }.bind(grids)); 
			this.m.update(grids); 
		}else{
			this.b.update(null); 
			this.m.update(null); 
		}
	}; 
	
	this.update(this.option('grids')); 
	
}; 

