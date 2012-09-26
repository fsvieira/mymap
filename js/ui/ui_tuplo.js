function UI_Tuplo(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<div class="tuplo">');
	var separator = $('<div class="separator" />'); 
	separator.html(this.defs.separator); 
	
	var label = $('<div class="label" />'); 
	label.html(this.defs.label); 
	
	this.root.append(label); 
	this.root.append(this.defs.a.root); 
	this.root.append(separator); 
	this.root.append(this.defs.b.root); 
	this.root.append($('<div style="clear:both" />')); 

}; 
