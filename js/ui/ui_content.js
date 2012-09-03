function UI_Content(model, args, defs){
	UI.call(this, model, args, defs); 
	this.root = $('<div class="content" />'); 
	
	this.update = this.option('update'); 

	this.model.event('change', function(e){
		this.root.html(''); 

        var item = e.args['item']; 
        if(item){
			// var ui = new UI_Group(this, {'uis' : UI.mkUI(item, {}) }); 
			var ui = this.update(item); 
			// this.root.append(ui.root); 
		}
	    
	}.bind(this)); 
	
}; 
