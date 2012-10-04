function UI_Group(args, defs){
	UI.call(this, args, defs);

	var uis = this.option('uis'); 
	
	var label = this.option('label'); 

	if(label){
		this.root = $('<fieldset class="group" />');
		this.root.append($('<legend>' + this.option('label') + '</legend>'));
	}else{
		this.root = $('<div class="group" />');
	}
	 
	for (i in uis){
		this.root.append(uis[i].root); 
	}
	
}; 



