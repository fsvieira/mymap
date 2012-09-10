function UI_Input(args, defs){
	UI.call(this, args, defs); 
	
	/*
	 * TODO: seperate input types, make a class generic class input
	 */
	
	this.root = $('<div />'); 

	
	this.input = null; 
	
	switch(this.option('type')){
		case 'file': this.input = $("<input type='file' />"); break; 
		default: this.input = $("<input type='text' />"); 
	}; 
	
	/*
	if(this.option('type') == 'file'){
		this.input = $("<input type='file' />"); 
	}else{
		this.input = $("<input type='text' />"); 
	}*/
	
	this.label = $('<div class="label" />'); 
	this.root.append(this.label); 
	this.root.append(this.input); 
	
	
	this.change = function(){
		if(this.option('type') != 'file'){
			if(this.model){
				this.input.val(this.model.get()); 
			}else{
				this.input.val(""); 
			}
			
		}
	}.bind(this); 
		
	
	this.input.change(
		function(e){
			if(this.defs.type){
				switch(this.defs.type){
					case 'int': this.model.set(parseInt($(e.target).val())); break; 
					default: this.model.set($(e.target).val()); 
				}
			}else{
				this.model.set($(e.target).val()); 
			}
		}.bind(this)
	); 
	
	this.update = function(model){
		if(this.model){
			this.model.remove_event('change', this.change); 
		}
		this.model = model; 
		if(this.model){
			this.model.event('change', this.change); 	
			this.change(); 
			
			if(!this.option('hideLabel')){
				this.label.html(this.getLabel()+ " "); 
			}
		}
	}; 
	
	this.update(this.option('model')); 
	
	
}; 
