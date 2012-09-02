function UI_Button(model, args, defs){
	UI.call(this, model, args, defs); 

	this.root = $('<button>'+this.getLabel() + '</button>'); 
	this.root.click(defs.func); 
	
}; 
