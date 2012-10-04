function UI_Boolean(args, defs){
	UI.call(this, args, defs); 
	this.root = $('<div />'); 
	this.input = $("<input type='checkbox' />"); 
	
	this.label = $('<div class="label" />'); 
	this.root.append(this.label); 
	this.root.append(this.input); 
	
	
	this.change = function(){
		if(this.model){
			if(this.model.get()){
				this.input.attr('checked', true); 
			}else{
				this.input.attr('checked', false); 
			}
			
		}else{
			this.input.attr('checked', false);
		}
	}.bind(this); 
		
	
	this.input.change(
		function(e){
			this.model.toogle(); 
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


function UI_BooleanIcon(args, defs){
	UI.call(this, args, defs); 
	this.root = $('<div />'); 
	
	this.active = this.option('active'); 
	this.inactive = this.option('inactive'); 
	
	
	this.root.click(function(){
		this.model.toogle(); 
	}.bind(this)); 
	
	this.change = function(){
		if(this.model){
			if(this.model.get()){
				this.root.attr('class', this.active); 
			}else{
				this.root.attr('class', this.inactive); 
			}
			
		}else{
			this.root.attr('inactive', this.inactive);
		}
	}.bind(this); 
	
	this.update = function(model){
		if(this.model){
			this.model.remove_event('change', this.change); 
		}
		this.model = model; 
		if(this.model){
			this.model.event('change', this.change); 	
			this.change(); 
		}
	}; 
	
	this.update(this.option('model')); 
	
	
}; 



