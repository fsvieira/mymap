function UI_Content(model, args, defs){
	UI.call(this, model, args, defs); 
	this.root = $('<div class="content" />'); 
	
	this.mk = this.option('mk'); 

	this.model.event('change', function(e){
		this.root.html(''); 

        var item = e.args['item']; 
        if(item){
			// var ui = new UI_Group(this, {'uis' : UI.mkUI(item, {}) }); 
			var ui = this.mk(item); 
			this.root.append(ui.root); 
		}
	    
	}.bind(this)); 
	
}; 
