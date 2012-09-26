function UI_Input(args, defs){
	UI.call(this, args, defs); 
	
	this.root = $('<div />'); 
	this.input = this.input?this.input:$('<input type="text" />'); 
	
	this.label = $('<div class="label" />'); 
	this.root.append(this.label); 
	this.root.append(this.input); 
	
	
	this.change = function(){
		if(this.model){
			this.input.val(this.model.get()); 
		}else{
			this.input.val(""); 
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
			
			if(!this.option('hideLabel')){
				this.label.html(this.getLabel()+ " "); 
			}
			
			this.input.prop('disabled', false);
		}else{
			this.input.prop('disabled', true);
		}
	}; 
	
	this.update(this.option('model')); 
	
	
}; 

function UI_InputInt(args, defs){
	UI_Input.call(this, args, defs); 
	this.input.addClass('int'); 
	
	this.input.change(function(e){
		var val = parseInt($(e.target).val()); 
		if(val){
			this.input.val(val); 
			this.model.set(val);
		}else{
			this.input.val(this.model.get()); 
			alert('Only Numbers are allowed.'); 
		}
	}.bind(this)); 
	
	
}; 

function UI_InputFile(args, defs){
	this.input = $('<input type="file" />');
	UI_Input.call(this, args, defs); 
	this.change = function(){}; 
	
	
	this.input.change(function(e){
		this.model.set($(e.target).val()); 
	}.bind(this));
	
}; 

function UI_InputText(args, defs){
	UI_Input.call(this, args, defs); 
	
	this.input.addClass('text'); 
	
	this.input.change(function(e){
		this.model.set($(e.target).val()); 
	}.bind(this));
	
}; 


