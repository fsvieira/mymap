function UI_Tuplo(model, args, defs){
	UI.call(this, model, args, defs); 
	
	this.root = $('<div>');
	
	this.root.append(this.defs.label); 
	// this.a = UI.getUI(this.defs.a, {'el': this.div, 'hideLabel': true }); 
	this.root.append(this.defs.a.root); 
	
	this.root.append(this.defs.separator); 
	// this.b = UI.getUI(this.defs.b, {'el': this.div, 'hideLabel': true}); 
	this.root.append(this.defs.b.root); 

	
	// this.getEl().append(this.root); 
	

}; 
