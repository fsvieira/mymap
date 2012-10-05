function UI_MapEditor(project, args, defs){
	UI.call(this, args, defs); 

	this.version = new UI_Text(args, {'label':'Version'});
	this.name = new UI_InputText(args, {'label':'Name'}); 
	this.grids = new UI_Grids(args, {'label': 'Grids' }); 
	this.tileManagers = new UI_TileManagers(args, defs);
	this.maps = new UI_Maps(args, defs); 
	this.map = new UI_Map(args, {'maps': this.maps}); 
	this.tm = new UI_TileManager(args, {'tms': this.tileManagers}); 
	this.show_tiles = new UI_Tiles(args, {'ui_tm': this.tm}); 
	this.tile = new UI_Tile(args, {'ui_tiles': this.show_tiles}); 
	this.map_draw = new UI_MapDraw(args, {'ui_map': this.map,'ui_tile':this.tile}); 
	this.cell = new UI_Cell(args, {'ui_mapdraw': this.map_draw}); 

	var ui = new UI_Group({
		'uis': [
			new UI_Group({	
					'uis' : [ this.version, this.name, this.grids],
					'label' : 'Project Settings', 
			}),  
			
			new UI_Group({
				'uis' : [ 
					this.tileManagers, 
					this.tm,
					this.show_tiles, 
					this.tile, 
				], 'label': 'Tile Manager'
			}), 

			new UI_Group({
				'uis': [
					this.maps, 
					this.map, 
					this.map_draw,
					this.cell,
				], 
				'label': 'Map Editor', 
			}), 
		] 
	}); 
	
	$('#project').append(ui.root); 

	this.update = function(project){
		this.version.update(project.version); 
		this.name.update(project.name); 
		this.grids.update(project.grids); 
		this.maps.update(project.maps);
		this.tileManagers.update(project.tileManagers); 
		
	}; 

	this.update(project);

	this.animation = function(){
		this.map_draw.animate(); 
	}.bind(this); 

	setInterval(this.animation, 1000/30);

}; 





