
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

function UI_Tiles(tm, args, defs){
	UI.call(this, tm, args, defs); 

	this.root = $('<div style="position:relative" />'); 
	
	this.image = new UI_Image(tm, args, defs); 
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.root.append(this.image.root); 
	this.root.append(this.canvas_elem); 
	
	this.canvas = this.canvas_elem.getContext("2d"); 
	
	this.select = $("<div class='tm_select' />");
	this.root.append(this.select); 
	
	this.sc = 0; 
	this.sl = 0; 
	
	this.root.click(function(e){
			var xy = getPosition(e);
			this.sc = Math.floor(xy.x/this.model.tile_w.get()); 
			this.sl = Math.floor(xy.y/this.model.tile_h.get()); 
			this.draw_select(); 
	}.bind(this)); 
	
	this.draw_select = function(){
		var width = this.model.tile_w.get(); 
		var height = this.model.tile_h.get();
		var border = 3*2; 
		this.select.css({
				'height': height-border,
				'width': width-border,
				'left': width*this.sc,
				'top': height*this.sl 
			});
			
		if(this.canvas_elem.width && this.canvas_elem.height){
			this.select.show(); 
		}else{
			this.select.hide(); 
		}
	}; 
	
	
	
	this.draw_grid = function(){
		this.canvas.clearRect(0,0, this.canvas_elem.width, this.canvas_elem.height); 
		var w; var h; 
		var width = this.model.tile_w.get(); 
		var height = this.model.tile_h.get();  
		tc = Math.floor(this.canvas_elem.width/width); 
		tl = Math.floor(this.canvas_elem.height/height); 
		this.canvas.lineWidth = 1;
		this.canvas.strokeStyle = "#0000ff";

		
		this.sc = 0; 
		this.sl = 0; 
		this.draw_select(); 

		for(w=0; w<tc; w++){
			for(h=0; h<tl; h++){
				var x=w*width; 
				var y=h*height; 
				this.canvas.beginPath();
				this.canvas.moveTo(x,y);
				this.canvas.lineTo(x+width,y);
				this.canvas.lineTo(x+width,y+height);
				this.canvas.lineTo(x,y+height);
				this.canvas.closePath();
				this.canvas.stroke();
			}
		}
					
		
		 
	}; 
	
	this.set_grid = function(){
		this.canvas_elem.width = this.image.canvas_elem.width; 
		this.canvas_elem.height = this.image.canvas_elem.height; 
		this.draw_grid(); 
	}; 
	
	this.model.tile_w.event('change', this.draw_grid.bind(this)); 
	this.model.tile_h.event('change', this.draw_grid.bind(this)); 
	
	this.image.event('change', this.set_grid.bind(this)); 
	
	this.set_grid(); 
}; 

function UI_Image(tm, args, defs){
	UI.call(this, tm, args, defs); 
	
	this.canvas_elem = document.createElement("canvas"); 
	this.canvas_elem.setAttribute('style', 'position: absolute;'); 
	this.root = this.canvas_elem; 
	this.canvas = this.canvas_elem.getContext("2d"); 

	this.load_image = function(){
		this.canvas_elem.height = 0; 
		this.canvas_elem.width = 0; 
		if(this.model.image.get() != null){
			var path = 'images/'+this.model.image.get(); 
			this.image = new Image(); 
			this.image.onload = function(){
				this.canvas_elem.height = this.image.height; 
				this.canvas_elem.width = this.image.width; 
				this.canvas.drawImage(this.image, 0, 0); 
				
				if(this.image.height < this.model.tile_h.get()){
					this.model.tile_h.set(this.image.height); 
				}
				
				if(this.image.width < this.model.tile_w.get()){
					this.model.tile_w.set(this.image.width); 
				}
				
				if(this.model.alpha.get()){
					imgd = this.canvas.getImageData(0, 0, this.image.width, this.image.height); 
					bw_data(imgd); 
					this.canvas.putImageData(imgd, 0, 0,this.image.width, this.image.height); 
				}
				this.trigger_event(new Event(['change'], {'model': this})); 
			}.bind(this); 
			this.image.src = path; 
		}else{
			this.trigger_event(new Event(['change'], {'model': this})); 
		}
		
	}; 

	this.model.image.event('change', this.load_image.bind(this)); 		
	
	this.load_image(); 
}; 

function UI_TileManager(tm, args, defs){
	UI.call(this, tm, args, defs); 
	
	 var name = new UI_Input(tm.name, args, {'label':'Name'});
 	 var w = new UI_Input(tm.tile_w, args, {'label':'Tile Width', 'type': 'int', 'hideLabel': true,}); 
	 var h = new UI_Input(tm.tile_h, args, {'label':'Tile Height', 'type': 'int', 'hideLabel': true,}); 
	 var wh = new UI_Tuplo(tm, args, {'a': w, 'b': h, 'label': 'Tile Width x Height', 'separator': 'x' }); 
	 var image = new UI_Input(tm.image, args, {'label':'Image', 'type': 'file' }); 	
	 var show_tiles = new UI_Tiles(tm, args, defs); 
 	 var ui = new UI_Group(this, {'uis': [name, wh, image, show_tiles]});
	
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
			new UI_Grids(project.grids, args, defs), 
			new UI_Maps(project.maps, args, defs), 
			new UI_TileManagers(project.tileManagers, args, defs), 
			
		] 
	}); 
	
	$('#project').append(ui.root); 

}; 


