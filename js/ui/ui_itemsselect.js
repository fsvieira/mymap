function UI_ItemsSelect(model, args, defs){
	UI.call(this, model, args, defs); 
	
	this.root = $('<select>'); 
		
	this.update_select = function(){
		this.root.html('');
		
		if(this.items){
			for( i in this.items.field){
				var item = this.items.field[i]; 
				var option; 
				if(this.item == item){ 
					option = $('<option value="'+i+'">'+item.getName()+'</option>'); 
				}else{
					option = $('<option selected="selected" value="'+i+'">'+item.getName()+'</option>');	
				}
				
				this.root.append(option); 
			}	
			
			this.selected(); 
		}
	}.bind(this); 
	
	this.selected = function(){
		var option = this.root.find('option:selected'); 
		var i = parseInt(option.val());
		if(!i){i=0;}
		 
		this.item = this.items.get_item(i); 
		
		// if(this.choice){
		this.model.set(this.item); 
		// }
		
		this.trigger_event(new Event( ['change'], {'item': this.item}) );
	}; 
	
	this.root.change(this.selected.bind(this));
	
	this.update = function(model, items){
		
		this.model = model; 
		if(this.items){
			this.items.remove_event('change', this.update_select); 
		}
		
		this.items = items; 
		if(this.items){
			this.items.event('change', this.update_select); 
		}
		
		if(this.model){
			this.item = this.model.field;
		}
		
		this.update_select(); 
		
	}; 

	this.update(model, this.option('items')); 
	
};

