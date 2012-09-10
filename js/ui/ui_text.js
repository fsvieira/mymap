function UI_Text(args, defs){
	UI.call(this,args, defs); 

	this.root = $('<div />'); 
	
	this.update = function(model){
		var t = this.getLabel(); 
		if(t != ''){
			t += ': '; 
		}
		
		if(model){	
			t += model.get(); 
		}
		this.root.html(t); 
	}; 
	
	this.update(this.option('model')); 
	
};
