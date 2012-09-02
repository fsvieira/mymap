function UI_Input(model, args, defs){
	UI.call(this, model, args, defs); 
	
	this.root = $('<div class="'+model.label+'" >'); 
	if(!this.option('hideLabel')){
		this.root.append(this.getLabel()+ " "); 
	}
	
	if(this.option('type') == 'file'){
		this.input = $("<input type='file' value='"+this.model.get()+"' />"); 
	}else{
		this.input = $("<input type='text' value='"+this.model.get()+"' />"); 
	}
	
	this.root.append(this.input); 
	
	this.model.event('change', function(){this.input.val(this.model.get()); }.bind(this)); 
	
	this.input.change(
		function(e){
			// if(this.defs.type){
				switch(this.defs.type){
					case 'int': this.model.set(parseInt($(e.target).val())); 
					default:
						this.model.set($(e.target).val()); 
				}
			/*}else{
				this.model.set($(e.target).val()); 
			}*/
		}.bind(this)
	); 
	
}; 
