function UI_Text(model, args, defs){
	UI.call(this, model, args, defs); 

	var t = this.getLabel(); 
	if(t != ''){
		t += ': '; 
	}
		
	t += this.model.get(); 
	
	this.root = $('<div />'); 
	this.root.append(t); 
	
	// this.args.el.html(t); 	
	
};
