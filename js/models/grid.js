function Grid(
	type, 
	columns, 
	lines, 
	cell_width, 
	cell_height 
){
	Model.call(this); 
	this.mkField({'label': 'type', 'value':type }); 
	this.mkField({'label': 'columns', 'value':columns }); 
	this.mkField({'label': 'lines', 'value':lines }); 
	this.mkField({'label': 'cell_width', 'value':cell_width }); 
	this.mkField({'label': 'cell_height', 'value':cell_height }); 


	this.getName = function(){
		var r; 
		if(this.type.get() == Grid.ORTHOGNAL){
			r = 'ORTHO'; 
		}else{
			r = 'ISO'; 
		}
		
		r+= '-' + this.columns.get() + 'x' + this.lines.get() + '|' +  this.cell_width.get() + 'x' + this.cell_height.get(); 
		return r; 
	}; 
	
	/*this.ui = {
		'type': function(args){ return new UI_Enum(this, args, {'enums': ['Orthogonal', 'Isometric']});}.bind(this.type), 
		'columns_lines': function(args){
							var a = new UI_Input(this.columns, args, {'label':'Columns', 'type':'int', 'hideLabel': true,});  
							var b = new UI_Input(this.lines, args, {'label':'Lines', 'type':'int', 'hideLabel': true,});
							return new UI_Tuplo(this, args, {'a': a, 'b': b, 'label': 'Columns x Lines', 'separator': 'x' }); 
						}.bind(this), 
		'cell_width_height': function(args){ 
									var a = new UI_Input(this.cell_width, args, {'label':'Cell width', 'type':'int', 'hideLabel': true, }); 
									var b = new UI_Input(this.cell_height, args, {'label':'Cell height', 'type':'int', 'hideLabel': true,}); 
									return new UI_Tuplo(this, args, {'a': a, 'b': b, 'label': 'Cell Width x Height', 'separator': 'x' }); 
							}.bind(this), 
	};*/  
	
}; 

Grid.ORTHOGNAL = 0; 
Grid.ISOMETRIC = 1;






