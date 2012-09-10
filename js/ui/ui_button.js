function UI_Button(args, defs){
	UI.call(this, args, defs); 

	this.func = this.option('func'); 

	this.root = $('<button>'+this.getLabel() + '</button>'); 
	this.root.click(function(){
			if(this.func){
				this.func(); 
			}
	}.bind(this)); 

	this.update = function(func){
		this.func = func; 
		if(this.func){
			this.root.removeAttr("disabled");
		}else{
			this.root.attr("disabled", "disabled");
		}
	}; 
	
}; 
