function UI_Group(args, defs){
	UI.call(this, args, defs);

	var uis = this.option('uis'); 
	
	this.root = $('<div class="group_test" />');
	for (i in uis){
		this.root.append(uis[i].root); 
	}
	
}; 

