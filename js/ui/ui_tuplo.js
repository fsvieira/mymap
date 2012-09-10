function UI_Tuplo(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<div>');
	this.root.append(this.defs.label); 
	this.root.append(this.defs.a.root); 
	this.root.append(this.defs.separator); 
	this.root.append(this.defs.b.root); 


}; 
