function UI_Text(model, args, defs){
	UI.call(this, model, args, defs); 

	this.root = $('<div />'); 
	
	this.update = function(model){
		var t = this.getLabel(); 
		if(t != ''){
			t += ': '; 
		}
			
		t += model.get(); 
		this.root.html(t); 
	}; 
	
	this.update(model); 
	
};
