function UI(model, args, defs){
	Model.call(this);
	this.args = args; 
	this.defs = defs; 
	
	this.getLabel = function(){
		if(this.args && this.args.label){
			return this.args.label; 
		}else if(this.defs && this.defs.label){
			return this.defs.label; 
		}
		
		return ""; 
	};
	
	this.option = function(name){
		if(this.args[name]){
			return this.args[name]; 
		}else{
			if(this.defs){
				return this.defs[name]; 
			}
		}
		return null; 
	}

	
	

	
};

