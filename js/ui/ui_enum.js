function UI_Enum(model, args, defs){
	UI.call(this, model, args, defs); 
	
	this.root = $('<select>'); 
	// this.getEl().append(this.select); 
	
	this.update = function(){
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
	}; 
	
	this.root.change(function(){
		var i = this.root.find('option:selected').val(); 
		this.model.set(parseInt(i) ); 
	}.bind(this)); 
	
	this.model.event('change', this.update.bind(this)); 
	
	this.update(); 
	
};  
