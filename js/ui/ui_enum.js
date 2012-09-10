function UI_Enum(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<select>'); 
	
	this.update_select = function(){
		this.root.html('');
		for(i in this.defs.enums){
			var item = this.defs.enums[i]; 
			var option; 
			if(this.model.field == i){
				option = $('<option value="'+i+'" selected="selected" >'+item+'</option>'); 
			}else{
				option = $('<option value="'+i+'">'+item+'</option>'); 
			}
			this.root.append(option); 
		}
	}.bind(this); 
	
	this.root.change(function(){
		var i = this.root.find('option:selected').val(); 
		this.model.set(parseInt(i) ); 
	}.bind(this)); 
	
	this.update = function(model){
		if(this.model){
			this.remove_event('change', this.update_select); 
		}
		
		this.model = model; 
		if(this.model){
			this.model.event('change', this.update_select); 
		}
	}; 
	
	this.update(this.option('model'));
	
};  
